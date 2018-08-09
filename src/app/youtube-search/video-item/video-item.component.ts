import {Component, Input, OnInit} from '@angular/core';
import {SearchResult} from '../../models/search-result';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.css']
})
export class VideoItemComponent implements OnInit {
  @Input() result: SearchResult;
  constructor() { }

  ngOnInit() {
  }

}
