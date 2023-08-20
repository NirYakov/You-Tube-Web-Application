import { Injectable } from '@angular/core';
import { Clip } from './clip.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';


const BACKEND_URL = environment.apiUrl;

interface clipsDb {
  name: string,
  link: string,
  category: string,
  review?: string,
}

@Injectable({
  providedIn: 'root'
})
export class ClipsService {

  myClips: Clip[] = [];

  clipsUpdate = new Subject<Clip[]>();
  setCategoryies = new Set<string>();

  categoryUpdate = new Subject<Set<string>>();

  allStarCategory = "All *";

  loadSingleClip: Clip = {
    shortUri: "pXRviuL6vMY",
    category: "Nu metal",
    name: "stressed out",
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private router: Router) { }


  getClips() {
    this.http.get<{ message: string, clips: clipsDb[] }>(BACKEND_URL + "/clips")
      .subscribe(
        {
          next: clipsData => {
            console.log(clipsData);
            this.myClips = clipsData.clips.map(clip => {
              return {
                name: clip.name,
                shortUri: clip.link,
                category: clip.category,
                review: clip.review
              }
            });

            this.clipsUpdate.next([...this.myClips]);
            this.updateInternal();
          },
          error: err => {
            console.log(err);
          }
        });
  }



  addClip(category: string, ytLink: string, name: string, review: string) {
    const clip: Clip = {
      shortUri: ytLink,
      category: category,
      review: review,
      name: name,
    };

    if (ytLink)
      this.http.post<Clip>(BACKEND_URL + '/clips/create', clip).subscribe(

        {
          next: responseData => {
            console.log(responseData);
            this.myClips.push(clip);
            this.updateInternal();

            this.router.navigate(["/"]);
          },
          error: error => {
            console.log(error);
          }
        })
    else {
      console.log("Not have an Id ...");
    };
  }

  updateInternal() {

    this.setCategoryies.add(this.allStarCategory);


    this.myClips.forEach(clip => this.setCategoryies.add(clip.category));



    this.categoryUpdate.next(new Set<string>(this.setCategoryies));
    this.clipsUpdate.next([...this.myClips]);
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



  getClipsUpdateListener() {
    return this.clipsUpdate.asObservable();

  }
  getCategoryUpdateListener() {
    return this.categoryUpdate.asObservable();
  }


  MoveToSingle(clip: Clip) {
    this.loadSingleClip = clip;
  }



  getClip(routId: string) {

    console.log("GetClip Front");
    this.updateInternal();
  }


  deleteClip(shortUri: string) {
    this.http.delete(BACKEND_URL + '/clips/' + shortUri).subscribe(
      {
        next: responseData => {
          console.log(responseData);
          this.router.navigate(["/"]);
        },
        error: error => {
          console.log(error);
        }
      })

  }


}
