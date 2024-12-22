import {Injectable, OnDestroy, Signal, signal} from "@angular/core";
import {TranslocoService} from "@jsverse/transloco";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {buildTranslationKey} from '@helper/trans.helper';

const staticTranslator: { trans: Translator | null } = {trans: null};
export type TranslatorParams = object | undefined;

@Injectable({
  providedIn: "root",
})
export class Translator implements OnDestroy {
  private readonly langChanges$: Observable<string>;
  private readonly langLoaded$: Observable<string>;
  private readonly langLoadedSubscription: Subscription;
  private currentLang = signal(this.translator.getActiveLang());

  constructor(private translator: TranslocoService) {
    staticTranslator.trans = this;
    this.langChanges$ = translator.langChanges$;
    this.langLoaded$ = translator.events$.pipe(
      map(() => translator.getActiveLang()),
    );
    this.langLoadedSubscription = this.langLoaded$.subscribe((item) =>
      this.currentLang.set(item),
    );
  }

  public activeLang(): Signal<string> {
    return this.currentLang;
  }

  public translate(
    key: string | string[],
    params?: TranslatorParams,
    lang?: string,
  ): string {
    const currentLang = lang ?? this.translator.getActiveLang();
    const fullKey = Array.isArray(key) ? buildTranslationKey(...key) : key;
    return this.translator.translate(fullKey, params, currentLang);
  }

  ngOnDestroy(): void {
    this.langLoadedSubscription.unsubscribe();
  }
}
