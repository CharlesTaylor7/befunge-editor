import Alpine from "alpinejs";
import type { ExecutionState, Mode, Program } from '@/types';
import { gridLookup, gridInit, Position } from "@/grid";
import { execute, advance, pushInput } from "@/utilities/execute";
import { initialPrograms, initialExecutionState } from "@/utilities/defaultState";


class Befunge {
  execution: ExecutionState = initialExecutionState;
  mode: Mode = 'edit';
  gridMode: boolean = false;
  
  programs: Array<Program> = initialPrograms;
  programText: string = initialPrograms[0].code.join('\n');
   
  animationInterval: number | undefined = undefined

  get paused() {
    return !this.animationInterval || this.execution.pendingInput || this.execution.executionComplete
  }

  changeProgram(index: number) {
    this.programText = this.programs[index].code.join('\n');
  }

  lookup(position: Position): string {
    return gridLookup(this.execution.grid, position);
  }

  edit() {
    this.animationInterval = undefined;
    this.mode = 'edit';
    this.gridMode = false;
  }

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
  }

  step() {
    if (this.execution.pendingInput) {
      return;
    }
    if (this.mode !== 'execute') {
      this.initExecuteMode();
      this.animationInterval = undefined;
    }
    this.execution = execute(this.execution, { strict: false });
    if (this.execution.pendingInput) {
      return;
    }
    this.execution = advance(this.execution);
  }

  animate() {
    if (this.mode !== 'execute') {
      this.initExecuteMode();
    }
    this.animationInterval = 200;
  }

  executing(position: Position) {
    return this.mode === 'execute' && this.execution.executionPointer.x == position.x && this.execution.executionPointer.y == position.y;
  }

  pushInput(event: InputEvent) {
    this.execution = pushInput(this.execution, event.target.value);
    this.execution = advance(this.execution);
  }
}

Alpine.store('befunge', new Befunge());
Alpine.start();

window.Alpine = Alpine;
