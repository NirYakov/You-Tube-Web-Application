import { Component, Input, OnInit } from '@angular/core';
import { Clip } from '../clip.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-clip-card',
  templateUrl: './clip-card.component.html',
  styleUrls: ['./clip-card.component.css']
})
export class ClipCardComponent implements OnInit {

  baseUriYt: SafeResourceUrl = "https://www.youtube.com/embed/";
  YtUrl: SafeResourceUrl = "https://www.youtube.com/embed/";

  @Input() clip: Clip =
    {
      shortUri: "pXRviuL6vMY",
      category: "Nu metal",
      name: "stressed out",
    };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.YtUrl = this.returnVideoUrl(this.clip.shortUri);
  }

  returnVideoUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.
    // this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    const dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    const videoUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
    return videoUrl;
  }

}
