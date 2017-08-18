declare var Vivus: any;
import { Component, OnInit } from '@angular/core';
import 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    const useless: any = new Vivus('title-svg', { duration: 100 }, this.fillSVG);
  }

  fillSVG(): void {
    const transparency = .1;
    const timeout = 20;
    // document.getElementById('title-cn').setAttribute('class', 'fillSVGBlack');
    // document.getElementById('title-cn').className += 'fillSVGBlack';

    // document.getElementById('title-cn').style.fill = 'rgba(10,10,10,.1)';
    // document.getElementById('title-hat-oir').style.fill = 'rgba(253,20,20,.1)';
    // Can't seem to be able to loop neither with css transitions nor jquery's animate, will do it by hand.
    (function loop(trans){
      document.getElementById('title-cn').style.fill = 'rgba(10,10,10,' + trans + ')';
      document.getElementById('title-hat-oir').style.fill = 'rgba(253,20,20,' + trans + ')';
      if (trans < 1) {
        setTimeout(function() {
          loop(trans + .1);
        }, timeout);
      }
    })(transparency);
  }
}
