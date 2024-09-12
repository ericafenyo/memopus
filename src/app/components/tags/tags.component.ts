import {Component, OnInit, signal} from '@angular/core';
import {Store} from "@app/core/services/store.service";
import {Tag} from "@app/models/tag";
import {LucideAngularModule} from "lucide-angular";
import {IconButtonComponent} from "@app/components/ui/icon-button/icon-button.component";
import {ChipComponent} from "@app/components/ui/chip/chip.component";
import {CreateTagComponent} from "@app/components/create-tag/create-tag.component";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [LucideAngularModule, IconButtonComponent, ChipComponent, CreateTagComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})

export class TagsComponent implements OnInit {
  tags!: Tag[];
  isCreateTag = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.tags.subscribe(tags => {;
      this.tags = tags
    });
  }

  onClick(tag: Tag) {
    this.store.actions.filterBy(tag);
  }

  onDismiss() {
    this.isCreateTag = false;
  }

  handleClick() {
    this.isCreateTag = true
  }
}
