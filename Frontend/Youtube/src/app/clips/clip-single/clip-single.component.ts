import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Clip } from '../clip.model';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClipsService } from '../clips.service';

@Component({
  selector: 'app-clip-single',
  templateUrl: './clip-single.component.html',
  styleUrls: ['./clip-single.component.css']
})
export class ClipSingleComponent implements OnInit, OnDestroy {

  // baseUriYt: SafeResourceUrl = "https://www.youtube.com/embed/";
  YtUrl: SafeResourceUrl = "https://www.youtube.com/embed/";

  editMode = false;

  myReviewText = new FormControl('');
  selectFormControl = new FormControl('', [Validators.required]);
  clipnameControl = new FormControl('', [Validators.required]);
  // selectFormControl


  setCategoryies = new Set();

  subCategories!: Subscription;


  @Input() clip: Clip =
    {
      shortUri: "pXRviuL6vMY",
      category: "Nu metal",
      name: "stressed out",
      review: "Wow the best song in the wolrd!!"
    };

  constructor(private sanitizer: DomSanitizer, private clipsService: ClipsService) { }

  ngOnInit() {
    this.YtUrl = this.returnVideoUrl(this.clip.shortUri);

    this.initCreateAndAll();

  }

  initCreateAndAll() {
    this.subCategories = this.clipsService.getCategoryUpdateListener().subscribe(cate => {
      // cate.delete(cate[0]);
      const [el] = cate;
      cate.delete(el);
      this.setCategoryies = cate;
      console.log("this.setCategoryies", this.setCategoryies);
      this.selectFormControl.setValue(this.clip.category);

    });

    this.clipsService.getClips();

    this.clipnameControl.setValue(this.clip.name);

  }

  ngOnDestroy(): void {
    this.subCategories.unsubscribe();
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

  EditMode() { this.editMode = true; }

  onSave() {


    console.log("this.selectFormControl", this.selectFormControl);
    console.log("this.myReviewText", this.myReviewText);
    console.log("this.clipnameControl", this.clipnameControl);


  }

  onDelete() {
    console.log("onDelete() ...");
  }
}
