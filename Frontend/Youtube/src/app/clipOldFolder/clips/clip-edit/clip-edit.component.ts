import { Component, Input, OnInit } from '@angular/core';
import { ClipsService } from '../clips.service';
import { Clip } from '../clip.model';
import { Subscription } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-clip-edit',
  templateUrl: './clip-edit.component.html',
  styleUrls: ['./clip-edit.component.css']
})
export class ClipEditComponent implements OnInit {

  link = '';

  // youtubeUrl(link)

  youtubeLink: SafeResourceUrl = "";
  flagHaveYoutubeLink = false;

  selectedValue!: string;
  setCategoryies = new Set();


  subCategories!: Subscription;

  @Input() clip: Clip =
    {
      shortUri: "pXRviuL6vMY",
      catagory: "Nu metal",
      name: "stressed out",
    };

  constructor(private clipsService: ClipsService) {

  }

  ngAfterViewInit(): void {
    // this.initCreateAndAll()

    // this.youtubeLink = this.youtubeUrl(this.clip.shortUri);

  }

  youtubeUrl(link: string) {
    if (!link) { return ""; }


    console.log("youtubeUrl Work?");

    const ytLink = this.clipsService.returnVideoUrl(link.split("=")[1]);;
    console.log(ytLink);

    this.youtubeLink = ytLink;
    this.flagHaveYoutubeLink = true;

    return ytLink;
  }

  ngOnDestroy(): void {
    this.subCategories.unsubscribe();
  }


  ngOnInit() {

    console.log("Hre in the init ?");

    // this.initCreateAndAll()

  }

  initCreateAndAll() {
    this.subCategories = this.clipsService.getCategoryUpdateListener().subscribe(cate => {
      this.setCategoryies = cate;
      console.log("L o l");
    });

    // const routId = this.route.snapshot.params['id'];
    // this.clipsService.getClips(routId);
  }

  changeValue() {
    console.log("Value Changed!");
    this.youtubeUrl(this.link);
  }


  AddNewClip() {
    console.log("HERERE POST ???? AAA");
    if (this.selectedValue) {
      console.log(this.selectedValue, this.link);
      // const routId = this.route.snapshot.params['id'] || Math.floor(Math.random() * 50_000);
      // const routId = this.route.snapshot.params['id'];
      // this.clipsService.addClip(this.selectedValue, this.link.split("=")[1], routId);
    }
    else {
      console.log("Not have Clip Value");
    }
  }

}
