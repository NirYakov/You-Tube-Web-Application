import { Injectable } from '@angular/core';
import { Clip } from './clip.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ClipsService {

  basePath = `http://localhost:3000`

  // myClips: Clip[] = [];

  clipsUpdate = new Subject<Clip[]>();
  setCategoryies = new Set<string>();

  categoryUpdate = new Subject<Set<string>>();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }



  getClips(routId: string) {

    console.log("GetClips Front");

    // console.log(`routeId :  ${routId}`);
    // this.http.get<{ clips: Clip[] }>(this.basePath + '/clips/' + routId).subscribe((resClips) => {
    //   this.myClips = resClips.clips;
    //   this.updateInternal();


    // });


    // return [...this.myClips];

    this.setCategoryies.add("All *");
    this.updateInternal();
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
    this.myClips.forEach(clip => this.setCategoryies.add(clip.catagory));

    this.categoryUpdate.next(new Set<string>(this.setCategoryies));
    this.clipsUpdate.next([...this.myClips]);
  }


  //   addPost(title: string, content: string) {
  //     const post: Post = { id: "", title: title, content: content };

  //     this.http.post(this.basePath + "/posts", post )
  //     .subscribe((responseData) =>
  //     {
  //         console.log(responseData);
  //         this.posts.push(post);
  //         this.postUpdate.next([...this.posts]);

  //     });

  // }

  // getPosts() {
  //   this.http.get<{ message: string, posts: Post[] }>(this.basePath + "/posts")
  //       .subscribe((postData) => {
  //           this.posts = postData.posts;
  //           this.postUpdate.next([...this.posts]);
  //       });

  //   // return [...this.posts];
  // }



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

  myClips: Clip[] = [
    {
      shortUri: "T60uj6EfsU8",
      catagory: "Rock",
      name: "From heads Unworth",
    },
    {
      shortUri: "kXYiU_JCYtU",
      catagory: "Nu metal",
      name: "numb",
    },
    {
      shortUri: "RRKJiM9Njr8",
      catagory: "Rock",
      name: "my chemical romance",
    },
    {
      shortUri: "fibYknUCIU4",
      catagory: "Rap",
      name: "nate / clounds",
    },
    {
      shortUri: "r_0JjYUe5jo",
      catagory: "Rap",
      name: "god zilla",
    },
    {
      shortUri: "XGGWhOUYObc",
      catagory: "Rap",
      name: "nate / Leave me alone",
    },
    {
      shortUri: "SBjQ9tuuTJQ",
      catagory: "Rock",
      name: "the pritender",
    },
    {
      shortUri: "DWaB4PXCwFU",
      catagory: "Rock",
      name: "dairy of jane",
    },
    {
      shortUri: "70hIRnj9kf8",
      catagory: "Rock",
      name: "the good die young",
    },
    {
      shortUri: "3t2WkCudwfY",
      catagory: "Nu metal",
      name: "a place for my head",
    },
    {
      shortUri: "pXRviuL6vMY",
      catagory: "Nu metal",
      name: "stressed out",
    },
  ];

}
