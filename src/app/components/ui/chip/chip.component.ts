import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@app/core/services/store.service";
import {Tag} from "@app/models/tag";

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css'
})
export class ChipComponent implements OnInit {
  @Input() tag!: Tag;

  active: boolean = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.activeTag.subscribe(tag => {
      tag ? this.active = tag.id === this.tag.id : this.active = false;
    })
  }
}
