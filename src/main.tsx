import { initialPrograms, initialExecutionState } from "@/utilities/defaultState";
import Alpine from "alpinejs";
import type { AppState } from '@/types';
import { initialExecutionState as defaultState } from "@/utilities/defaultState";
import { gridLookup, gridUpdate, gridInit, gridProgram, Position } from "@/grid";
import { execute, advance, pushInput } from "@/utilities/execute";

Alpine.store('befunge', {
  execution: initialExecutionState,
  mode: 'edit',
  gridMode: false,
  
  programs: initialPrograms,
  programText: initialPrograms[0].code.join('\n'),
  paused: false,

  changeProgram(index: number) {
    this.programText = this.programs[index].code.join('\n');
  },

  lookup(position: Position): string {
    return gridLookup(this.execution.grid, position);
  },

  edit() {
    this.mode = 'edit';
    this.gridMode = false;
  },

  initExecuteMode() {
    this.mode =  'execute';
    let program = this.programText.split("\n");
    const last = program.pop();
    if (last !== undefined && last !== "") {
      program.push(last);
    }
    let { dimensions, grid } = gridInit(program);
    this.gridMode = true;
    this.execution = initialExecutionState;
    this.execution.dimensions = dimensions;
    this.execution.grid = grid;
  },

  step() {
    if (this.mode !== 'execute') {
      this.initExecuteMode();
    }
    this.paused = true;
    this.execution = execute(this.execution);
    this.execution = advance(this.execution);
  },

  animate() {
    if (this.mode !== 'execute') {
      this.initExecuteMode();
    }
    this.paused = false;
  },

  executing(position: Position) {
    return this.mode === 'execute' && this.execution.executionPointer.x == position.x && this.execution.executionPointer.y == position.y;
  },
} as AppState);

Alpine.start();

window.Alpine = Alpine;
