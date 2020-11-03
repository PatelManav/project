import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface Todo {
  title: String;
  indent: Number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DragDrop';
  standards = [];

  drop(event: CdkDragDrop<Todo[]>) {
    var indent = this.standards[event.previousIndex].indent;
    moveItemInArray(this.standards, event.previousIndex, event.currentIndex);
    if (event.previousIndex < event.currentIndex) {
      while (this.standards[event.previousIndex].indent > indent) {
        moveItemInArray(
          this.standards,
          event.previousIndex,
          event.currentIndex
        );
      }
    } else {
      let i = 1;
      while (this.standards[event.previousIndex + i].indent > indent) {
        moveItemInArray(
          this.standards,
          event.previousIndex + i,
          event.currentIndex + i
        );
        i++;
      }
    }
  }

  add() {
    var indent = 0;
    if (this.standards.length - 1 >= 0) {
      indent = this.standards[this.standards.length - 1].indent;
    }
    this.standards.push({ title: 'Add new standard here', indent: indent });
  }

  delete(index) {
    this.standards.splice(index, 1);
  }

  indent(index) {
    this.standards[index].indent += 1;
  }

  outdent(index) {
    this.standards[index].indent -= 1;
  }
}
