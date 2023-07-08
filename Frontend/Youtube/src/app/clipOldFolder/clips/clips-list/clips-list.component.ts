import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Clip } from '../clip.model';
import { ClipsService } from '../clips.service';
import { Observable, Subscription, map, startWith } from 'rxjs';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css']
})
export class ClipsListComponent implements OnInit, OnDestroy {

  inputControl: FormControl;

  dangerousVideoUrl: string = "";
  videoUrl: SafeResourceUrl = "";
  showClips: Clip[];

  myClips: Clip[];
  strAll = "All *";
  selectedValue!: string; //= 'All *';

  // this.categoryUpdate

  subClips: Subscription;
  subCategories: Subscription;
  setCategoryies = new Set();

  constructor(public clipsService: ClipsService, private route: ActivatedRoute) {
    // this.updateVideoUrl('70hIRnj9kf8');


    this.setCategoryies.add(this.strAll);
    this.showClips = this.myClips = [];

    this.subClips = this.clipsService.getClipsUpdateListener().subscribe((clips) => {
      this.showClips = this.myClips = clips;
    });


    this.subCategories = this.clipsService.getCategoryUpdateListener().subscribe(cate => {
      this.setCategoryies = cate;
    });

    // const routId = this.route.snapshot.params['id'] ;
    const routId = this.route.snapshot.params['id'] || 0; // BM

    this.clipsService.getClips(routId);
    this.inputControl = new FormControl(""); // new FormControl("",Validators.required);

  }

  ngOnDestroy(): void {
    this.subClips.unsubscribe();
    this.subCategories.unsubscribe();
  }

  testLabel: string = "";

  onClickNameClip(clip: Clip) {
    console.log(clip);

    this.testLabel = this.toTitleCase(clip.name);

  }

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }


  //// this is what we have in the auto complate to work!

  ngOnInit() {
    // All *




    this.filteredOptions = this.autoComplateControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),);

    this.options = this.myClips.map(clip => clip.name);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  emptyArray = [];

  clearSearchClip() {
    this.clipResultsSearch = this.emptyArray;
    this.autoComplateControl.setValue(' ');
  }


  showClippp(clipName) {

    console.log("clipName", clipName);

    this.clipResultsSearch = this.myClips.filter(clip => {
      return clip.name === clipName;
    });
  }

  clipResultsSearch: Clip[] = [];

  autoComplateControl: FormControl = new FormControl('', {});

  // filteredOptions

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;


  // updateCategories()
  // {
  //   this.myClips.forEach(clip => this.setCategoryies.add(clip.catagory));
  //   console.log("Clips : ", this.myClips);
  // }





  allClipsAll = true;

  filterClips(event: any) {
    event.preventDefault();

    this.allClipsAll = !this.allClipsAll;



    if (!this.selectedValue || this.selectedValue === this.strAll) {
      this.showClips = this.myClips;
    } else {
      this.showClips = this.myClips.filter((clip) => clip.catagory === this.selectedValue);
    }
  }


  ///////////////////// Tiles Example


  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];




  ////////////////////////////////////


  // https://www.youtube.com/embed/70hIRnj9kf8

  baseUriYt = "https://www.youtube.com/embed/";

  // https://www.youtube.com/watch?v=T60uj6EfsU8
  // https://www.youtube.com/watch?v=SBjQ9tuuTJQ
  // https://www.youtube.com/watch?v=DWaB4PXCwFU





}


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
