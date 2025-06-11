import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Subscription, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
// TODO: REFACTOR LOGIC
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public breadcrumbs: MenuItem[] | undefined;
  readonly home = { icon: 'ph ph-house', routerLink: '' };
  private routerSubscription!: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    routerLink: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data['breadcrumb']
        : '';

    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // For dynamic route such as ':accountName/:accountNumber'
    const lastRoutePart = path!.split('/').pop();
    const isDynamicRoute = lastRoutePart!.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const lastParamName = lastRoutePart!.split(':')[1];
      path = path!.replace(
        lastRoutePart!,
        route.snapshot.params[lastParamName]
      );

      const segments = path.split('/');
      if (segments.length >= 2) {
        const previousSegment = segments[segments.length - 2];
        const paramName = previousSegment.split(':')[1];
        path = path.replace(previousSegment, route.snapshot.params[paramName]);
        label = route.snapshot.params[paramName];
      }
    }

    const nextUrl = path ? `${routerLink}/${path}` : routerLink;

    const breadcrumb = {
      label: label,
      routerLink: nextUrl,
    };

    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
