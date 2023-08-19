import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClipsService } from '../clips.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-clip-create',
  templateUrl: './clip-create.component.html',
  styleUrls: ['./clip-create.component.css']
})
export class ClipCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  link = '';

  // youtubeUrl(link)

  youtubeLink: SafeResourceUrl = "";
  flagHaveYoutubeLink = false;
  newCategoryMode = false;

  selectedValue!: string;
  setCategoryies = new Set();

  newCategoryForm = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', [Validators.required]);
  clipnameControl = new FormControl('', [Validators.required]);
  myReviewText = new FormControl('');


  subCategories!: Subscription;

  constructor(private clipsService: ClipsService, private route: ActivatedRoute, private router: Router) {

  }

  ngAfterViewInit(): void {
    // this.initCreateAndAll()

  }

  makeNewCategory() {
    this.newCategoryMode = !this.newCategoryMode;
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

    this.initCreateAndAll()

  }

  initCreateAndAll() {
    this.subCategories = this.clipsService.getCategoryUpdateListener().subscribe(cate => {
      const [el] = cate;
      cate.delete(el);
      this.setCategoryies = cate;
    });

    const routId = this.route.snapshot.params['id'];
    this.clipsService.getClips();
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



  AddNewClipTest() {

    let category = this.selectFormControl.value;

    if (this.newCategoryMode) {
      category = this.newCategoryForm.value;
    }

    const shortUri = this.link.split("=")[1];
    const name = this.clipnameControl.value;
    const review = this.myReviewText.value;

    console.log("category", category);
    // console.log("link", this.link);
    console.log("clipnameControl.value", name);
    console.log("clipnameControl.value split ", shortUri);
    console.log("myReviewText.value", review);


    this.clipsService.addClip(category, shortUri, name, review);


    this.router.navigate(["/"]);

  }
}
