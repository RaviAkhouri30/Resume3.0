import { Directive, ElementRef, HostListener, OnDestroy, Renderer2 } from '@angular/core';

const textElementSelector = 'h1, h2, h3, h4, h5, h6, p, li, strong, span, a, label, small, em, b, td, th';

@Directive({
    standalone: true,
    selector: textElementSelector
})
export class TextMagnifierDirective implements OnDestroy {
    private static activeDirective: TextMagnifierDirective | null = null;
    private tooltip: HTMLDivElement | null = null;
    private tooltipText: HTMLSpanElement | null = null;

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly renderer: Renderer2
    ) { }

    @HostListener('mouseenter', ['$event'])
    onMouseEnter(event: Event): void {
        if (!(event instanceof MouseEvent)) {
            return;
        }

        if (!this.isHoveredTextElement(event)) {
            return;
        }

        const text = this.getText();
        if (!text) {
            return;
        }

        this.showTooltip(event, text);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: Event): void {
        if (!(event instanceof MouseEvent)) {
            return;
        }

        if (!this.isHoveredTextElement(event)) {
            return;
        }

        if (!this.tooltip) {
            const text = this.getText();
            if (text) {
                this.showTooltip(event, text);
            }

            return;
        }

        this.positionTooltip(event);
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.hideTooltip();
    }

    @HostListener('focusin')
    onFocusIn(): void {
        const text = this.getText();
        if (!text) {
            return;
        }

        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        this.showTooltipFromElement(rect, text);
    }

    @HostListener('focusout')
    onFocusOut(): void {
        this.hideTooltip();
    }

    ngOnDestroy(): void {
        this.hideTooltip();
    }

    private getText(): string {
        const text = this.elementRef.nativeElement.textContent?.trim() ?? '';
        return text.replace(/\s+/g, ' ');
    }

    private isHoveredTextElement(event: MouseEvent): boolean {
        const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
        return hoveredElement?.closest(textElementSelector) === this.elementRef.nativeElement
            && !this.hasTextElementDescendant();
    }

    private hasTextElementDescendant(): boolean {
        return this.elementRef.nativeElement.querySelector(textElementSelector) !== null;
    }

    private showTooltip(event: MouseEvent, text: string): void {
        if (TextMagnifierDirective.activeDirective && TextMagnifierDirective.activeDirective !== this) {
            TextMagnifierDirective.activeDirective.hideTooltip();
        }

        TextMagnifierDirective.activeDirective = this;
        this.createTooltip();

        if (!this.tooltip) {
            return;
        }

        this.setTooltipText(text);
        this.positionTooltip(event);
        this.tooltip.style.opacity = '1';
        this.tooltip.style.transform = 'translateY(0) scale(1)';
    }

    private showTooltipFromElement(rect: DOMRect, text: string): void {
        if (TextMagnifierDirective.activeDirective && TextMagnifierDirective.activeDirective !== this) {
            TextMagnifierDirective.activeDirective.hideTooltip();
        }

        TextMagnifierDirective.activeDirective = this;
        this.createTooltip();

        if (!this.tooltip) {
            return;
        }

        this.setTooltipText(text);

        const x = Math.min(
            window.innerWidth - 180,
            Math.max(12, rect.left + rect.width / 2 - 80)
        );
        const y = Math.max(12, rect.top - 60);

        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y}px`;
        this.tooltip.style.opacity = '1';
        this.tooltip.style.transform = 'translateY(0) scale(1)';
    }

    private createTooltip(): void {
        if (this.tooltip) {
            return;
        }

        const tooltip = this.renderer.createElement('div');
        this.renderer.setStyle(tooltip, 'position', 'fixed');
        this.renderer.setStyle(tooltip, 'isolation', 'isolate');
        this.renderer.setStyle(tooltip, 'left', '0px');
        this.renderer.setStyle(tooltip, 'top', '0px');
        this.renderer.setStyle(tooltip, 'maxWidth', '280px');
        this.renderer.setStyle(tooltip, 'padding', '10px 14px');
        this.renderer.setStyle(tooltip, 'borderRadius', '18px');
        this.renderer.setStyle(tooltip, 'background', 'linear-gradient(145deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.06) 22%, rgba(0, 0, 0, 0.36) 100%)');
        this.renderer.setStyle(tooltip, 'backdropFilter', 'blur(18px) saturate(135%)');
        this.renderer.setStyle(tooltip, 'WebkitBackdropFilter', 'blur(18px) saturate(135%)');
        this.renderer.setStyle(tooltip, 'boxShadow', 'inset 0 1px 0 rgba(255, 255, 255, 0.42), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 8px 14px rgba(0, 0, 0, 0.12), 0 20px 42px rgba(0, 0, 0, 0.22)');
        this.renderer.setStyle(tooltip, 'border', '1px solid rgba(255, 255, 255, 0.3)');
        this.renderer.setStyle(tooltip, 'overflow', 'hidden');
        this.renderer.setStyle(tooltip, 'transformOrigin', 'center bottom');
        this.renderer.setStyle(tooltip, 'color', '#ffffff');
        this.renderer.setStyle(tooltip, 'fontSize', '14px');
        this.renderer.setStyle(tooltip, 'fontWeight', '600');
        this.renderer.setStyle(tooltip, 'lineHeight', '1.4');
        this.renderer.setStyle(tooltip, 'letterSpacing', '0.01em');
        this.renderer.setStyle(tooltip, 'pointerEvents', 'none');
        this.renderer.setStyle(tooltip, 'opacity', '0');
        this.renderer.setStyle(tooltip, 'transform', 'translateY(6px) scale(0.96)');
        this.renderer.setStyle(tooltip, 'transition', 'opacity 180ms ease, transform 180ms ease');
        this.renderer.setStyle(tooltip, 'zIndex', '99999');
        this.renderer.setStyle(tooltip, 'whiteSpace', 'normal');
        this.renderer.setStyle(tooltip, 'wordBreak', 'break-word');

        const reflection = this.renderer.createElement('span');
        this.renderer.setStyle(reflection, 'position', 'absolute');
        this.renderer.setStyle(reflection, 'top', '-80%');
        this.renderer.setStyle(reflection, 'left', '-45%');
        this.renderer.setStyle(reflection, 'width', '34%');
        this.renderer.setStyle(reflection, 'height', '260%');
        this.renderer.setStyle(reflection, 'background', 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 35%, rgba(255, 255, 255, 0.42) 50%, rgba(255, 255, 255, 0.08) 65%, transparent 100%)');
        this.renderer.setStyle(reflection, 'filter', 'blur(8px)');
        this.renderer.setStyle(reflection, 'mixBlendMode', 'screen');
        this.renderer.setStyle(reflection, 'opacity', '0.72');
        this.renderer.setStyle(reflection, 'transform', 'rotate(24deg)');
        this.renderer.setStyle(reflection, 'animation', 'textMagnifierReflection 2.2s ease-in-out infinite');
        this.renderer.setStyle(reflection, 'pointerEvents', 'none');

        const tooltipText = this.renderer.createElement('span');
        this.renderer.setStyle(tooltipText, 'position', 'relative');
        this.renderer.setStyle(tooltipText, 'zIndex', '1');

        this.renderer.appendChild(tooltip, reflection);
        this.renderer.appendChild(tooltip, tooltipText);
        this.renderer.appendChild(document.body, tooltip);
        this.tooltip = tooltip;
        this.tooltipText = tooltipText;
    }

    private setTooltipText(text: string): void {
        if (this.tooltipText) {
            this.tooltipText.textContent = text;
        }
    }

    private positionTooltip(event: MouseEvent): void {
        if (!this.tooltip) {
            return;
        }

        const tooltipWidth = this.tooltip.offsetWidth || 220;
        const tooltipHeight = this.tooltip.offsetHeight || 52;
        const offsetX = 18;
        const offsetY = -18;

        let x = event.clientX + offsetX;
        let y = event.clientY + offsetY;

        const maxX = window.innerWidth - tooltipWidth - 12;
        const maxY = window.innerHeight - tooltipHeight - 12;

        x = Math.min(Math.max(12, x), maxX);
        y = Math.min(Math.max(12, y), maxY);

        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y}px`;
    }

    private hideTooltip(): void {
        if (!this.tooltip) {
            return;
        }

        if (TextMagnifierDirective.activeDirective === this) {
            TextMagnifierDirective.activeDirective = null;
        }

        this.tooltip.style.opacity = '0';
        this.tooltip.style.transform = 'translateY(8px) scale(0.96)';

        setTimeout(() => {
            if (this.tooltip && this.tooltip.style.opacity === '0') {
                this.renderer.removeChild(document.body, this.tooltip);
                this.tooltip = null;
                this.tooltipText = null;
            }
        }, 180);
    }
}
