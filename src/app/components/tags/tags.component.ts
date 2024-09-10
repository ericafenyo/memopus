import {Component, OnInit} from '@angular/core';
import {Store} from "@app/services/store.service";
import {Tag} from "@app/interfaces/tag";
import {LucideAngularModule} from "lucide-angular";
import {IconButtonComponent} from "@app/components/ui/icon-button/icon-button.component";
import {ChipComponent} from "@app/components/ui/chip/chip.component";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    LucideAngularModule,
    IconButtonComponent,
    ChipComponent
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})

export class TagsComponent implements OnInit {
  tags!: Tag[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.tags.subscribe(tags => {
      console.log(tags);
      this.tags = tags
    });
  }

  addTag() {

  }

  onClick(tag: Tag) {
    this.store.filterBy(tag);
  }
}
