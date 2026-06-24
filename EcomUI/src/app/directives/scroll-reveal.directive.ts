import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({ selector: '[appScrollReveal]' })
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0; // ms

  private observer!: IntersectionObserver;
  private el: HTMLElement;

  constructor(ref: ElementRef) {
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {
    this.el.classList.add('anim-reveal');
    if (this.revealDelay) {
      this.el.style.transitionDelay = `${this.revealDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.classList.add('anim-on');
          this.observer.unobserve(this.el);
        }
      },
      { threshold: 0.12 }
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
