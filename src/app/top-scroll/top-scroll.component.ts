import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-scroll',
  templateUrl: './top-scroll.component.html',
  styleUrls: ['./top-scroll.component.css']
})
export class TopScrollComponent implements OnInit {

  constructor() {
  }

  scrollFunction() {
    if (document.getElementById('myBtn') != null) {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('myBtn').style.display = 'block';
      } else {
        document.getElementById('myBtn').style.display = 'none';
      }
    }
  }

// When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


  ngOnInit() {
    window.onscroll = () => this.scrollFunction();
  }


}
