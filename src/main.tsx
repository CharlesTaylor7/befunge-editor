import { initialPrograms, initialExecutionState } from "@/utilities/defaultState";
import Alpine from "alpinejs";
import type { AppState } from '@/types';

Alpine.store('befunge', {
  execution: initialExecutionState,
  mode: { tag: 'edit' },
  programs: initialPrograms,
  programText: initialPrograms[0].code.join('\n'),

  changeProgram(index: number) {
    this.programText = this.programs[index].code.join('\n');
  },
  edit() {
    this.mode = { tag: 'edit'};
  },
  step() {
  },
  animate() {
  },
} as AppState);

Alpine.start();

window.Alpine = Alpine;
