import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState, useRef } from "react";

import type { ExecutionState, Mode, EditMode, Program, Grid } from "@/types";
import Button from "@/components/Button";
import Toggle from "@/components/Toggle";
import { useAppState } from "@/context";
import defaultState from "@/utilities/defaultState";
import { gridLookup, gridUpdate, gridInit, gridProgram } from "@/grid";
import { execute, advance, pushInput } from "@/utilities/execute";

export default function Befunge() {
  // State
  const [count, setCount] = useState(0);
  const [appCount, setAppCount] = useAppState("count");
  const [state, updateState] = useAppState("execution");
  const [mode, setMode] = useAppState("mode");
  const [editMode, setEditMode] = useAppState("editMode");
  const [animationInterval] = useAppState("animationIntervalMillis");

  // Refs
  const stdinInputRef = useRef<HTMLInputElement>(null);

  // Callbacks
  const step = useCallback(
    () =>
      updateState((state) => {
        const executed = execute(state, { strict: false });
        if (executed.pendingInput) {
          stdinInputRef.current?.focus();
          return executed;
        }
        return advance(executed);
      }),
    [updateState],
  );

  const handleStdinInput = useCallback(() => {
    const value = stdinInputRef.current?.value;
    if (!stdinInputRef.current || !value || value.length === 0) {
      return;
    }

    stdinInputRef.current.value = "";
    stdinInputRef.current.blur();

    updateState((state) => {
      if (!state.pendingInput) return state;
      const input: number | string = state.pendingInput === "Number" ? Number(value) : value;
      return advance(pushInput(state, input));
    });
  }, [updateState]);

  const handleGridInput = useCallback(
    (e: string, i: number, j: number) =>
      updateState((state) => ({ ...state, grid: gridUpdate(state.grid, { x: i, y: j }, e) })),
    [updateState],
  );
  const loadGrid = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const lines = e.target.value.split("\n");
      const last = lines.pop();
      if (last !== undefined && last !== "") {
        lines.push(last);
      }
      updateState((state) => ({ ...state, ...gridInit(lines) }));
    },
    [updateState],
  );

  const restart = useCallback(() => {
    updateState((state) => ({ ...defaultState, grid: state.grid, dimensions: state.dimensions }));
  }, [updateState]);

  // Effects
  useEffect(() => {
    if (mode !== "animate" || state.pendingInput) {
      return;
    }
    const intervalId = setInterval(step, animationInterval);
    return () => clearInterval(intervalId);
  }, [mode, state.pendingInput, animationInterval, step]);

  const [programIndex, setProgramIndex] = useAppState("activeProgramIndex");
  const [programs] = useAppState("programs");
  useEffect(() => {
    updateState((state) => ({ ...state, ...gridInit(programs[programIndex].code) }));
  }, [programIndex, updateState]);

  return (
    <div className="w-screen h-screen flex flex-col gap-10 items-center">
      <header className="flex gap-5 mt-10">
        <Toggle testId="toggle-editor" onToggle={(toggled) => setEditMode(toggled ? "cell" : "text")}>
          Edit Text/Grid
        </Toggle>
        <Button
          testId="animate"
          disabled={mode === "animate"}
          onClick={() => {
            console.log("!!!animate clicked!!!");
            setCount((c) => c + 1);
            setAppCount((c) => c + 1);
            setMode("animate");
            restart();
          }}
        >
          Animate
        </Button>
        <Button onClick={() => setMode("edit")} disabled={mode === "edit"}>
          Edit
        </Button>
        <Button
          disabled={Boolean(state.pendingInput)}
          onClick={() => {
            setMode("step");
            step();
          }}
        >
          Step
        </Button>
        <select onChange={(e) => setProgramIndex(Number(e.target.value))}>
          {programs.map((p, i) => (
            <option key={i} value={i}>
              {" "}
              {p.name}
            </option>
          ))}
        </select>
      </header>
      <main className="flex flex-col items-center w-4/5 gap-5">
        {editMode === "text" && mode === "edit" ? (
          <TextEditor
            maxHeight={500}
            maxWidth={600}
            onChange={loadGrid}
            defaultValue={gridProgram(state.grid, state.dimensions)}
          />
        ) : (
          <>
            <div>
              <table
                data-testid="befunge-grid-editor"
                className="self-center table-fixed border-separate border-2 border-blue-200"
              >
                <tbody>
                  {Array.from({ length: state.dimensions.height }, (_, j) => (
                    <tr key={j}>
                      {Array.from({ length: state.dimensions.width }, (_, i) => (
                        <Cell
                          key={i}
                          i={i}
                          j={j}
                          value={gridLookup(state.grid, { x: i, y: j })}
                          onChange={handleGridInput}
                          mode={mode}
                          executing={
                            mode !== "edit" && state.executionPointer.x === i && state.executionPointer.y === j
                          }
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className="flex flex-col mx-4">
          <p>
            <label>Stdin: </label>
            <input
              className={`
                pl-3 border rounded
                ${state.pendingInput ? "border-red-300" : "border-slate-300"}
              `}
              type={state.pendingInput === "Number" ? "number" : "text"}
              ref={stdinInputRef}
              onBlur={handleStdinInput}
              onKeyDown={(e) => e.key === "Enter" && handleStdinInput()}
            />
          </p>
          <p>Stdout: {state.console}</p>
          <p>Heading: {state.heading}</p>
          Stack:
          <div className="flex flex-col">
            {Array.from(state.stack).map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
type CellProps = {
  i: number;
  j: number;
  value: string;
  onChange: (value: string, i: number, j: number) => void;
  executing: boolean;
  mode: Mode;
};

export function Cell(props: CellProps) {
  const { value, onChange, mode, executing, i, j } = props;
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <td
      className={`
        border text-center text-ellipsis p-0 w-[40px] h-[40px]
        ${executing ? "bg-amber-300 border-2" : ""}
      `}
    >
      {mode === "edit" || focus ? (
        <input
          data-testid={`cell-input-${i}-${j}`}
          tabIndex={1}
          className="block w-full h-full text-center heading-1"
          autoFocus={focus && mode !== "edit"}
          type="text"
          maxLength={1}
          defaultValue={value.trim()}
          onChange={(e) => onChange(e.target.value || " ", i, j)}
          onBlur={() => setFocus(false)}
        />
      ) : (
        <div
          className="w-full h-full hover:cursor-text flex items-center justify-center"
          onClick={() => setFocus(true)}
        >
          {value}
        </div>
      )}
    </td>
  );
}

type TextEditorProps = {
  maxHeight: number;
  maxWidth: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
};

export function TextEditor(props: TextEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    // Automatically grow container to match content
    ref.current.style.height = `${Math.min(ref.current.scrollHeight, props.maxHeight)}px`;
    ref.current.style.width = `${Math.min(ref.current.scrollWidth, props.maxWidth)}px`;
  });

  return (
    <textarea
      data-testid="befunge-text-editor"
      className="h-fit w-fit resize border rounded-xl border-blue-300 p-2 font-mono"
      autoFocus
      wrap="off"
      ref={ref}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    />
  );
}
