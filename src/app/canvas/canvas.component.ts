import { Component, Renderer2, ViewChild, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnDestroy {

  listenerDestroyers = [];
  context;

  @ViewChild('canvasArea')
  canvasArea: ElementRef;

  @Output()
  scribbleMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private renderer: Renderer2) { }

  sendScribble() {
    this.scribbleMessage.emit(this.canvasArea.nativeElement.toDataURL());
    this.clearCanvas();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, 160, 120);
  }

  ngAfterViewInit() {
    this.setDrawingLogic();
  }

  ngOnDestroy() {
    this.listenerDestroyers.forEach(destroyerFn => {
      destroyerFn();
    });
  }

  setDrawingLogic() {
    let mouseDown = false;
    const canvas = this.canvasArea.nativeElement;
    this.context = canvas.getContext('2d');
    let currentPosition: {x: number, y: number};

    this.listenerDestroyers.push(this.renderer.listen(this.canvasArea.nativeElement, 'click', (evt) => {
      // console.log('Clicking the button', evt);
      // console.log(`Canvas coordinates x:${evt.clientX - this.canvasArea.nativeElement.getBoundingClientRect().x}`);
    }));

    this.listenerDestroyers.push(this.renderer.listen(canvas, 'mousedown', onMouseDown));
    this.listenerDestroyers.push(this.renderer.listen(canvas, 'mouseup', onMouseUp_Out));
    this.listenerDestroyers.push(this.renderer.listen(canvas, 'mouseout', onMouseUp_Out));
    this.listenerDestroyers.push(this.renderer.listen(canvas, 'mousemove', throttle(onMouseMove, 30)));

    function onMouseUp_Out(event: MouseEvent) {
      if (mouseDown) {
        const newPosition = getPosition(event);
        drawLine(currentPosition.x, currentPosition.y, newPosition.x, newPosition.y);
        currentPosition = newPosition;
      }

      mouseDown = false;
    }

    function onMouseDown(event: MouseEvent) {
      mouseDown = true;
      currentPosition = getPosition(event);
    }

    function onMouseMove(event: MouseEvent) {
      if (!mouseDown) { return; }
      const newPosition = getPosition(event);
      drawLine(currentPosition.x, currentPosition.y, newPosition.x, newPosition.y);
      currentPosition = newPosition;
    }

    function throttle(callback, delay) {
      let previousCall = new Date().getTime();
      return function() {
        const time = new Date().getTime();
        if ((time - previousCall) >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    }

    const getPosition = (event: MouseEvent) => {
      // console.log(`Canvas coordinates x:${event.clientX - this.canvasArea.nativeElement.getBoundingClientRect().x}`);
      const x = event.clientX - this.canvasArea.nativeElement.getBoundingClientRect().x;
      const y = event.clientY - this.canvasArea.nativeElement.getBoundingClientRect().y;
      return {x, y};
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.strokeStyle = 'black';
      this.context.lineWidth = 2;
      this.context.stroke();
      this.context.closePath();
    };
  }

}
