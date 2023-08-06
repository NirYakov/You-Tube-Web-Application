import { Injectable } from '@angular/core';
import { Clip } from './clip.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClipsService {

  basePath = `http://localhost:3000/api`

  myClips: Clip[] = [];

  clipsUpdate = new Subject<Clip[]>();
  setCategoryies = new Set<string>();

  categoryUpdate = new Subject<Set<string>>();

  allStarCategory = "All *";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }


  getClips() {
    this.http.get<{ message: string, clips: Clip[] }>(this.basePath + "/clips")
      .subscribe(
        {
          next: clipsData => {
            this.myClips = clipsData.clips;
            this.clipsUpdate.next([...this.myClips]);
            this.updateInternal();

          },
          error: err => {
            console.log(err);
          }
        });
  }



  addClip(category: string, ytLink: string, userId: string) {
    const clip: Clip = {
      shortUri: ytLink,
      catagory: category,
      name: "not available",
    };

    if (userId)
      this.http.post<Clip>(this.basePath + '/createclip/' + userId, clip).subscribe(responseData => {
        console.log(responseData);
        this.myClips.push(clip);
        this.updateInternal();
      })
    else {
      console.log("Not have an Id ...");
    };
  }

  updateInternal() {

    this.setCategoryies.add(this.allStarCategory);


    this.myClips.forEach(clip => this.setCategoryies.add(clip.catagory));



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



  getClip(routId: string) {

    console.log("GetClip Front");

    // console.log(`routeId :  ${routId}`);
    // this.http.get<{ clips: Clip[] }>(this.basePath + '/clips/' + routId).subscribe((resClips) => {
    //   this.myClips = resClips.clips;
    //   this.updateInternal();


    // });


    // return [...this.myClips];

    // this.setCategoryies.add(this.allStarCategory);
    this.updateInternal();
  }



}
