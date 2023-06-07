import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightNumber]'
})
export class HighlightNumberDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const words = this.elementRef.nativeElement.innerText.split(' ');

    words.forEach((word: string) => {
      if (/^\d+$/.test(word)) {
        const span = this.renderer.createElement('span');
        const text = this.renderer.createText(`${word} `);
        this.renderer.addClass(span, 'highlighted'); // Add a CSS class
        this.renderer.appendChild(span, text);
        this.renderer.appendChild(this.elementRef.nativeElement, span);
      } else {
        const text = this.renderer.createText(`${word} `);
        this.renderer.appendChild(this.elementRef.nativeElement, text);
      }
    });

    this.renderer.removeChild(this.elementRef.nativeElement, this.elementRef.nativeElement.firstChild);
  }
}
