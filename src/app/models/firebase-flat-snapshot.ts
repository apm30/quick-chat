import { NgIf } from '@angular/common';

export class FirebaseFlatSnapshot {
  $key: string;
  constructor(obj?: any) {
    if (obj && obj.$key) {
      this.$key = obj.$key;
    }
  }
}
