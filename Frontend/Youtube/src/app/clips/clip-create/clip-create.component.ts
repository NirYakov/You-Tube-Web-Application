import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClipsService } from '../clips.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-clip-create',
  templateUrl: './clip-create.component.html',
  styleUrls: ['./clip-create.component.css']
})
export class ClipCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  link = '';

  youtubeLink: SafeResourceUrl = "";
  flagHaveYoutubeLink = false;
  newCategoryMode = false;

  setCategoryies = new Set();

  form = this.fb.group({
    link: ['', Validators.required],
    name: ['', Validators.required],
    categorySelect: [''],
    category: [''],
    review: ['', Validators.required],
  });


  subCategories!: Subscription;

  constructor(private clipsService: ClipsService, private fb: FormBuilder) { }

  ngAfterViewInit(): void {
    // this.initCreateAndAll()
  }

  makeNewCategory() { this.newCategoryMode = !this.newCategoryMode; }

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

  ngOnInit() { this.initCreateAndAll(); }

  initCreateAndAll() {
    this.subCategories = this.clipsService.getCategoryUpdateListener().subscribe(cate => {
      const [el] = cate;
      cate.delete(el);
      this.setCategoryies = cate;
    });

    // const routId = this.route.snapshot.params['id'];
    this.clipsService.getClips();
  }

  changeValue() {
    console.log("Value Changed!");
    this.link = this.form.get('link').value;
    this.youtubeUrl(this.link);
  }

  AddNewClipTest() {

    let category = this.form.get('categorySelect').value;

    if (this.newCategoryMode) {
      category = this.form.get('category').value;
    }

    const shortUri = this.link.split("=")[1];
    const name = this.form.get('name').value;
    const review = this.form.get('review').value;

    // console.log("link", this.link);
    console.log("shortUri ", shortUri);
    console.log("name ", name);
    console.log("category ", category);
    console.log("review ", review);


    this.clipsService.addClip(category, shortUri, name, review);

  }
}
