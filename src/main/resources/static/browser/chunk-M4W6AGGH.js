import {
  Actions,
  EffectsModule,
  Store,
  StoreModule,
  createAction,
  createEffect,
  createFeatureSelector,
  createReducer,
  createSelector,
  ofType,
  on,
  props
} from "./chunk-CYRLOP26.js";
import {
  ActivatedRoute,
  AsyncPipe,
  ButtonDirective,
  CommonModule,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  DefaultValueAccessor,
  Dialog,
  EventEmitter,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  InputText,
  InputTextarea,
  LucideAngularComponent,
  MaxLengthValidator,
  MessageService,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgSelectOption,
  PrimeNGModule,
  Rating,
  ReactiveFormsModule,
  Router,
  RouterLink,
  RouterModule,
  SelectControlValueAccessor,
  Toast,
  Tooltip,
  UserStorageService,
  Validators,
  __spreadProps,
  __spreadValues,
  catchError,
  environment,
  inject,
  map,
  of,
  switchMap,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-TMJRJQJ7.js";

// src/app/customer/customer.component.ts
var CustomerComponent = class _CustomerComponent {
  static \u0275fac = function CustomerComponent_Factory(t) {
    return new (t || _CustomerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomerComponent, selectors: [["app-customer"]], decls: 2, vars: 0, template: function CustomerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "customer works!");
      \u0275\u0275elementEnd();
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomerComponent, { className: "CustomerComponent" });
})();

// src/app/store/wishlist/wishlist.actions.ts
var loadWishlist = createAction("[Wishlist] Load Wishlist");
var loadWishlistSuccess = createAction("[Wishlist] Load Wishlist Success", props());
var loadWishlistFailure = createAction("[Wishlist] Load Wishlist Failure", props());
var addToWishlist = createAction("[Wishlist] Add To Wishlist", props());
var addToWishlistSuccess = createAction("[Wishlist] Add To Wishlist Success", props());
var addToWishlistFailure = createAction("[Wishlist] Add To Wishlist Failure", props());
var removeFromWishlist = createAction("[Wishlist] Remove From Wishlist", props());
var removeFromWishlistSuccess = createAction("[Wishlist] Remove From Wishlist Success", props());
var removeFromWishlistFailure = createAction("[Wishlist] Remove From Wishlist Failure", props());

// src/app/store/wishlist/wishlist.selectors.ts
var selectWishlistState = createFeatureSelector("wishlist");
var selectWishlistProducts = createSelector(selectWishlistState, (s) => s.products);
var selectWishlistIds = createSelector(selectWishlistState, (s) => s.ids);
var selectWishlistLoaded = createSelector(selectWishlistState, (s) => s.loaded);

// src/app/customer/services/customer.service.ts
var CustomerService = class _CustomerService {
  http;
  constructor(http) {
    this.http = http;
  }
  getAllProducts() {
    return this.http.get(environment.apiUrl + "api/customer/products", {
      headers: this.createAuthorizationHeader()
    });
  }
  getAllProductsByName(name) {
    return this.http.get(environment.apiUrl + `api/customer/products/search?name=${encodeURIComponent(name)}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  addToCart(productId) {
    const cartDto = {
      productId,
      userId: UserStorageService.getUserId()
    };
    return this.http.post(environment.apiUrl + `api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  getCartByUserId() {
    const userId = UserStorageService.getUserId();
    return this.http.get(environment.apiUrl + `api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  applyCoupon(code) {
    const userId = UserStorageService.getUserId();
    return this.http.post(environment.apiUrl + `api/customer/cart/${userId}/coupon?code=${encodeURIComponent(code)}`, {}, {
      headers: this.createAuthorizationHeader()
    });
  }
  placeOrder(orderDto) {
    orderDto.userId = UserStorageService.getUserId();
    return this.http.post(environment.apiUrl + `api/customer/cart/place-order`, orderDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  createPaymentOrder(amount) {
    const userId = UserStorageService.getUserId();
    return this.http.post(environment.apiUrl + `api/payment/create-order`, { amount, userId }, {
      headers: this.createAuthorizationHeader()
    });
  }
  verifyPayment(verifyDto) {
    return this.http.post(environment.apiUrl + `api/payment/verify`, verifyDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  getOrdersByUserId() {
    const userId = UserStorageService.getUserId();
    return this.http.get(environment.apiUrl + `api/customer/cart/${userId}/orders`, {
      headers: this.createAuthorizationHeader()
    });
  }
  getOrderedProducts(orderId) {
    return this.http.get(environment.apiUrl + `api/customer/cart/order/${orderId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  giveReview(reviewDto) {
    return this.http.post(environment.apiUrl + `api/customer/reviews`, reviewDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  increaseProductQuantity(productId) {
    const cartDto = {
      productId,
      userId: UserStorageService.getUserId()
    };
    return this.http.put(environment.apiUrl + `api/customer/cart/increase`, cartDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  descreaseProductQuantity(productId) {
    const cartDto = {
      productId,
      userId: UserStorageService.getUserId()
    };
    return this.http.put(environment.apiUrl + `api/customer/cart/decrease`, cartDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  removeFromCart(productId) {
    const userId = UserStorageService.getUserId();
    return this.http.delete(environment.apiUrl + `api/customer/cart/${userId}/${productId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  getProductDetailById(productId) {
    return this.http.get(environment.apiUrl + `api/customer/products/${productId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  addProductToWishlist(wishlistDto) {
    const userId = wishlistDto.userId;
    const productId = wishlistDto.productId;
    return this.http.post(environment.apiUrl + `api/customer/wishlist/${userId}/${productId}`, {}, {
      headers: this.createAuthorizationHeader()
    });
  }
  removeFromWishlist(productId) {
    const userId = UserStorageService.getUserId();
    return this.http.delete(environment.apiUrl + `api/customer/wishlist/${userId}/${productId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  getWishlistByUserId() {
    const userId = UserStorageService.getUserId();
    return this.http.get(environment.apiUrl + `api/customer/wishlist/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  getUserProfile(userId) {
    return this.http.get(environment.apiUrl + `api/customer/profile/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  updateUserProfile(userId, data) {
    return this.http.put(environment.apiUrl + `api/customer/profile/${userId}`, data, {
      headers: this.createAuthorizationHeader()
    });
  }
  createAuthorizationHeader() {
    return new HttpHeaders().set("Authorization", "Bearer " + UserStorageService.getToken());
  }
  static \u0275fac = function CustomerService_Factory(t) {
    return new (t || _CustomerService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CustomerService, factory: _CustomerService.\u0275fac, providedIn: "root" });
};

// src/app/customer/components/dashboard/dashboard.component.ts
var _c0 = (a0) => ["/customer/product", a0];
function DashboardComponent_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function DashboardComponent_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearSearch());
    });
    \u0275\u0275element(1, "lucide-angular", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 16);
  }
}
function DashboardComponent_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DashboardComponent_button_15_Template_button_click_0_listener() {
      const cat_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.filterByCategory(cat_r5));
    });
    \u0275\u0275elementStart(1, "div", 11);
    \u0275\u0275element(2, "lucide-angular", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cat_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("cat-chip--active", ctx_r2.selectedCategory === cat_r5);
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx_r2.getCatIcon(cat_r5))("size", 18);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r5);
  }
}
function DashboardComponent_div_47_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41);
    \u0275\u0275element(2, "img", 42);
    \u0275\u0275elementStart(3, "button", 43);
    \u0275\u0275listener("click", function DashboardComponent_div_47_div_7_Template_button_click_3_listener($event) {
      const product_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleWishlist(product_r7.id, $event));
    });
    \u0275\u0275element(4, "lucide-angular", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 45);
    \u0275\u0275listener("click", function DashboardComponent_div_47_div_7_Template_div_click_5_listener($event) {
      const product_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.addToCart(product_r7.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(6, "lucide-angular", 46);
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "Add to Cart");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 47)(10, "p", 48);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 49);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 50)(15, "span", 51);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 52);
    \u0275\u0275text(18, "In Stock");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const product_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c0, product_r7.id));
    \u0275\u0275advance();
    \u0275\u0275property("src", product_r7.processedImg, \u0275\u0275sanitizeUrl)("alt", product_r7.name);
    \u0275\u0275advance();
    \u0275\u0275classProp("pk-tile__wish--active", ctx_r2.isWishlisted(product_r7.id));
    \u0275\u0275advance();
    \u0275\u0275styleProp("fill", ctx_r2.isWishlisted(product_r7.id) ? "currentColor" : "none");
    \u0275\u0275property("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 15);
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(15, _c0, product_r7.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r7.categoryName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", product_r7.price, "");
  }
}
function DashboardComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35)(2, "h2", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 38);
    \u0275\u0275template(7, DashboardComponent_div_47_div_7_Template, 19, 17, "div", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedCategory === "All" ? "Deals For You" : ctx_r2.selectedCategory, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.products.length, " products");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.products);
  }
}
function DashboardComponent_ng_template_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275element(1, "lucide-angular", 54);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No products found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Try a different keyword or browse another category");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 56);
  }
}
var CAT_ICONS = {
  fashion: "shirt",
  clothing: "shirt",
  mobiles: "smartphone",
  mobile: "smartphone",
  phone: "smartphone",
  electronics: "cpu",
  beauty: "sparkles",
  home: "house",
  appliances: "zap",
  toys: "gamepad-2",
  food: "shopping-basket",
  grocery: "shopping-basket",
  sports: "dumbbell",
  fitness: "dumbbell",
  books: "book-open",
  furniture: "briefcase",
  auto: "car",
  automotive: "car",
  jewellery: "gem",
  jewelry: "gem",
  shoes: "footprints",
  footwear: "footprints",
  bags: "briefcase",
  watches: "watch",
  kids: "baby"
};
var DashboardComponent = class _DashboardComponent {
  customerService;
  fb;
  messageService;
  store;
  allProducts = [];
  products = [];
  categories = [];
  selectedCategory = "All";
  searchProductForm;
  wishlistedIds$;
  _wishlistedIds = [];
  constructor(customerService, fb, messageService, store) {
    this.customerService = customerService;
    this.fb = fb;
    this.messageService = messageService;
    this.store = store;
    this.wishlistedIds$ = this.store.select(selectWishlistIds);
  }
  ngOnInit() {
    this.searchProductForm = this.fb.group({ title: [null, Validators.required] });
    this.getAllProducts();
    this.store.dispatch(loadWishlist());
    this.wishlistedIds$.subscribe((ids) => {
      this._wishlistedIds = ids;
    });
  }
  isWishlisted(productId) {
    return this._wishlistedIds.includes(productId);
  }
  toggleWishlist(productId, event) {
    event.stopPropagation();
    if (this.isWishlisted(productId)) {
      this.store.dispatch(removeFromWishlist({ productId }));
    } else {
      this.store.dispatch(addToWishlist({ productId }));
    }
  }
  getAllProducts() {
    this.customerService.getAllProducts().subscribe((res) => {
      this.allProducts = res.map((p) => __spreadProps(__spreadValues({}, p), {
        processedImg: p.byteImg ? "data:image/jpeg;base64," + p.byteImg : null
      }));
      this.categories = [...new Set(this.allProducts.map((p) => p.categoryName))];
      this.applyFilter();
    });
  }
  filterByCategory(cat) {
    this.selectedCategory = cat;
    this.applyFilter();
  }
  applyFilter() {
    this.products = this.selectedCategory === "All" ? this.allProducts : this.allProducts.filter((p) => p.categoryName === this.selectedCategory);
  }
  submitForm() {
    const title = this.searchProductForm.get("title").value;
    this.customerService.getAllProductsByName(title).subscribe((res) => {
      this.allProducts = res.map((p) => __spreadProps(__spreadValues({}, p), {
        processedImg: p.byteImg ? "data:image/jpeg;base64," + p.byteImg : null
      }));
      this.selectedCategory = "All";
      this.categories = [...new Set(this.allProducts.map((p) => p.categoryName))];
      this.applyFilter();
    });
  }
  clearSearch() {
    this.searchProductForm.reset();
    this.getAllProducts();
  }
  addToCart(id) {
    this.customerService.addToCart(id).subscribe(() => {
      this.messageService.add({ severity: "success", summary: "Success", detail: "Product added to cart!", life: 3e3 });
    });
  }
  getCatIcon(cat) {
    const key = cat.toLowerCase().split(" ")[0];
    return CAT_ICONS[key] ?? "square-stack";
  }
  static \u0275fac = function DashboardComponent_Factory(t) {
    return new (t || _DashboardComponent)(\u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MessageService), \u0275\u0275directiveInject(Store));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 50, vars: 14, consts: [["noProducts", ""], [1, "fk-page"], [1, "fk-search", 3, "submit", "formGroup"], [1, "search-inner"], ["name", "search", "strokeWidth", "1.5", 1, "fk-search__icon", 3, "size"], ["formControlName", "title", "placeholder", "Search for Products, Brands and More", "autocomplete", "off", 1, "fk-search__input"], ["class", "fk-search__clear", "type", "button", "title", "Clear search", 3, "click", 4, "ngIf"], ["type", "submit", 1, "fk-search__btn", 3, "disabled"], ["name", "search", "strokeWidth", "2", 3, "size"], [1, "cat-nav"], [1, "cat-chip", 3, "click"], [1, "cat-chip__icon-wrap"], ["name", "layout-grid", "strokeWidth", "1.5", 3, "size"], [1, "cat-chip__label"], ["class", "cat-chip", 3, "cat-chip--active", "click", 4, "ngFor", "ngForOf"], [1, "hero-banners"], [1, "banner", "banner--blue"], [1, "banner__tag"], [1, "banner__title"], [1, "banner__sub"], [1, "banner__cta"], ["name", "tag", "strokeWidth", "1", 1, "banner__deco", 3, "size"], [1, "banner", "banner--white"], [1, "banner__tag", "banner__tag--dark"], [1, "banner__title", "banner__title--dark"], [1, "banner__sub", "banner__sub--dark"], [1, "banner__cta", "banner__cta--dark"], ["name", "sparkles", "strokeWidth", "1", 1, "banner__deco", "banner__deco--dark", 3, "size"], [1, "banner", "banner--dark"], ["name", "zap", "strokeWidth", "1", 1, "banner__deco", 3, "size"], ["class", "deals-section", 4, "ngIf", "ngIfElse"], ["type", "button", "title", "Clear search", 1, "fk-search__clear", 3, "click"], ["name", "x", "strokeWidth", "2", 3, "size"], ["strokeWidth", "1.5", 3, "name", "size"], [1, "deals-section"], [1, "deals-header"], [1, "deals-title"], [1, "deals-count"], [1, "pk-grid"], ["class", "pk-tile", 4, "ngFor", "ngForOf"], [1, "pk-tile"], [1, "pk-tile__img-box", 3, "routerLink"], ["loading", "lazy", 1, "pk-tile__img", 3, "src", "alt"], ["title", "Add to Wishlist", 1, "pk-tile__wish", 3, "click"], ["name", "heart", "strokeWidth", "2", 3, "size"], [1, "pk-tile__cta", 3, "click"], ["name", "shopping-cart", "strokeWidth", "2", 3, "size"], [1, "pk-tile__info", 3, "routerLink"], [1, "pk-tile__name"], [1, "pk-tile__cat"], [1, "pk-tile__price-row"], [1, "pk-tile__price"], [1, "pk-tile__badge"], [1, "pk-empty"], ["name", "search-x", "strokeWidth", "1", 1, "pk-empty__icon", 3, "size"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "form", 2);
      \u0275\u0275listener("submit", function DashboardComponent_Template_form_submit_1_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.submitForm());
      });
      \u0275\u0275elementStart(2, "div", 3);
      \u0275\u0275element(3, "lucide-angular", 4)(4, "input", 5);
      \u0275\u0275template(5, DashboardComponent_button_5_Template, 2, 1, "button", 6);
      \u0275\u0275elementStart(6, "button", 7);
      \u0275\u0275element(7, "lucide-angular", 8);
      \u0275\u0275text(8, "\xA0Search ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 9)(10, "button", 10);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.filterByCategory("All"));
      });
      \u0275\u0275elementStart(11, "div", 11);
      \u0275\u0275element(12, "lucide-angular", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "span", 13);
      \u0275\u0275text(14, "All");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(15, DashboardComponent_button_15_Template, 5, 5, "button", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 15)(17, "div", 16)(18, "p", 17);
      \u0275\u0275text(19, "BIG SAVING DAYS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "h3", 18);
      \u0275\u0275text(21, "Deals on Top Brands");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "p", 19);
      \u0275\u0275text(23, "Up to 80% off across categories");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "span", 20);
      \u0275\u0275text(25, "Shop Now \u2192");
      \u0275\u0275elementEnd();
      \u0275\u0275element(26, "lucide-angular", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 22)(28, "p", 23);
      \u0275\u0275text(29, "TRENDING NOW");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "h3", 24);
      \u0275\u0275text(31, "New Arrivals");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p", 25);
      \u0275\u0275text(33, "Fresh products added daily");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span", 26);
      \u0275\u0275text(35, "Explore \u2192");
      \u0275\u0275elementEnd();
      \u0275\u0275element(36, "lucide-angular", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 28)(38, "p", 17);
      \u0275\u0275text(39, "FLASH SALE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "h3", 18);
      \u0275\u0275text(41, "Limited Time Offers");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "p", 19);
      \u0275\u0275text(43, "Grab deals before they're gone");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "span", 20);
      \u0275\u0275text(45, "View Deals \u2192");
      \u0275\u0275elementEnd();
      \u0275\u0275element(46, "lucide-angular", 29);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(47, DashboardComponent_div_47_Template, 8, 3, "div", 30)(48, DashboardComponent_ng_template_48_Template, 6, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      const noProducts_r8 = \u0275\u0275reference(49);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.searchProductForm);
      \u0275\u0275advance(2);
      \u0275\u0275property("size", 18);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", (tmp_3_0 = ctx.searchProductForm.get("title")) == null ? null : tmp_3_0.value);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.searchProductForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275property("size", 16);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("cat-chip--active", ctx.selectedCategory === "All");
      \u0275\u0275advance(2);
      \u0275\u0275property("size", 18);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.categories);
      \u0275\u0275advance(11);
      \u0275\u0275property("size", 48);
      \u0275\u0275advance(10);
      \u0275\u0275property("size", 48);
      \u0275\u0275advance(10);
      \u0275\u0275property("size", 48);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.products.length > 0)("ngIfElse", noProducts_r8);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, LucideAngularComponent], styles: ['@charset "UTF-8";\n\n\n\n.fk-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 16px;\n}\n.fk-search[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.fk-search__clear[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  border: none;\n  border-radius: 50%;\n  color: var(--text-dim);\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background 0.15s, color 0.15s;\n}\n.fk-search__clear[_ngcontent-%COMP%]:hover {\n  background: var(--bg-elevated);\n  color: var(--text);\n}\n.cat-nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-sm);\n  padding: 4px 8px;\n  overflow-x: auto;\n  scrollbar-width: none;\n  border: 1px solid var(--border);\n}\n.cat-nav[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.cat-chip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  padding: 8px 16px 6px;\n  border-bottom: 3px solid transparent;\n  transition: border-color 0.15s, color 0.15s;\n  flex-shrink: 0;\n  color: var(--text-muted);\n}\n.cat-chip[_ngcontent-%COMP%]:hover {\n  border-bottom-color: rgba(255, 153, 0, 0.5);\n}\n.cat-chip--active[_ngcontent-%COMP%] {\n  border-bottom-color: var(--primary);\n}\n.cat-chip--active[_ngcontent-%COMP%]   .cat-chip__label[_ngcontent-%COMP%] {\n  color: var(--primary-dark);\n  font-weight: 700;\n}\n.cat-chip--active[_ngcontent-%COMP%]   .cat-chip__icon-wrap[_ngcontent-%COMP%] {\n  background: rgba(255, 153, 0, 0.12);\n}\n.cat-chip--active[_ngcontent-%COMP%]   .cat-chip__icon-wrap[_ngcontent-%COMP%]   lucide-angular[_ngcontent-%COMP%] {\n  color: var(--primary-dark);\n}\n.cat-chip__icon-wrap[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: var(--bg-elevated);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.15s;\n}\n.cat-chip__icon-wrap[_ngcontent-%COMP%]   lucide-angular[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n}\n.cat-chip[_ngcontent-%COMP%]:hover   .cat-chip__icon-wrap[_ngcontent-%COMP%] {\n  background: rgba(255, 153, 0, 0.1);\n}\n.cat-chip[_ngcontent-%COMP%]:hover   .cat-chip__icon-wrap[_ngcontent-%COMP%]   lucide-angular[_ngcontent-%COMP%] {\n  color: var(--primary-dark);\n}\n.cat-chip__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--text-muted);\n  white-space: nowrap;\n}\n.hero-banners[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 10px;\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n}\n@media (max-width: 700px) {\n  .hero-banners[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.banner[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: var(--radius-lg);\n  padding: 24px 20px;\n  min-height: 140px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: filter 0.2s;\n  border: 1px solid var(--border);\n}\n.banner[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.08);\n}\n.banner--blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #0D1117 0%,\n      #1A2332 50%,\n      #1F2D42 100%);\n  color: #fff;\n}\n.banner--white[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #FFF8F0 0%,\n      #FFFFFF 100%);\n  border: 1.5px solid rgba(255, 153, 0, 0.25);\n  color: var(--text);\n}\n.banner--dark[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #131921 0%,\n      #1E2D3D 50%,\n      #2D3748 100%);\n  color: #fff;\n}\n.banner__tag[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  color: #FF9900;\n  margin: 0 0 6px;\n}\n.banner__tag--dark[_ngcontent-%COMP%] {\n  color: var(--primary-dark);\n}\n.banner__title[_ngcontent-%COMP%] {\n  font-size: 19px;\n  font-weight: 800;\n  margin: 0 0 4px;\n  line-height: 1.2;\n  color: #fff;\n}\n.banner__title--dark[_ngcontent-%COMP%] {\n  color: var(--text);\n}\n.banner__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 0 0 12px;\n  opacity: 0.85;\n  color: rgba(255, 255, 255, 0.8);\n}\n.banner__sub--dark[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  opacity: 1;\n}\n.banner__cta[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 700;\n  color: #FF9900;\n  letter-spacing: 0.3px;\n}\n.banner__cta--dark[_ngcontent-%COMP%] {\n  color: var(--primary-dark);\n}\n.banner__deco[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 16px;\n  bottom: 16px;\n  color: rgba(255, 255, 255, 0.08);\n}\n.banner__deco--dark[_ngcontent-%COMP%] {\n  color: rgba(255, 153, 0, 0.15);\n}\n.deals-section[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-sm);\n  border: 1px solid var(--border);\n  padding: 16px;\n}\n.deals-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  margin-bottom: 14px;\n  padding-bottom: 12px;\n  border-bottom: 2px solid var(--primary);\n}\n.deals-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: var(--font-display);\n  color: var(--text);\n  margin: 0;\n}\n.deals-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n}\n.pk-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 1px;\n  background: var(--border);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  overflow: hidden;\n}\n@media (max-width: 1200px) {\n  .pk-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n@media (max-width: 900px) {\n  .pk-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 580px) {\n  .pk-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.pk-tile[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  transition: box-shadow 0.2s, transform 0.2s;\n}\n.pk-tile[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow);\n  transform: scale(1.02);\n  z-index: 2;\n  position: relative;\n}\n.pk-tile[_ngcontent-%COMP%]:hover   .pk-tile__img[_ngcontent-%COMP%] {\n  transform: scale(1.2);\n}\n.pk-tile[_ngcontent-%COMP%]:hover   .pk-tile__cta[_ngcontent-%COMP%] {\n  transform: translateY(0);\n  opacity: 1;\n}\n.pk-tile__img-box[_ngcontent-%COMP%] {\n  position: relative;\n  height: 200px;\n  overflow: hidden;\n  background: var(--bg-elevated);\n}\n.pk-tile__img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 16px;\n  transition: transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);\n  will-change: transform;\n  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));\n}\n.pk-tile__wish[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  z-index: 3;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.92);\n  border: 1.5px solid var(--border);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  opacity: 0;\n  transform: scale(0.8);\n  transition:\n    opacity 0.2s,\n    transform 0.2s,\n    background 0.15s;\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n}\n.pk-tile__wish[_ngcontent-%COMP%]   lucide-angular[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  transition: color 0.15s, transform 0.2s;\n}\n.pk-tile__wish--active[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: scale(1);\n  background: #fef2f2;\n  border-color: rgba(220, 38, 38, 0.3);\n}\n.pk-tile__wish--active[_ngcontent-%COMP%]   lucide-angular[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.pk-tile__wish[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n  border-color: rgba(220, 38, 38, 0.3);\n}\n.pk-tile__wish[_ngcontent-%COMP%]:hover   lucide-angular[_ngcontent-%COMP%] {\n  color: #dc2626;\n  transform: scale(1.2);\n}\n.pk-tile[_ngcontent-%COMP%]:hover   .pk-tile__wish[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: scale(1);\n}\n.pk-tile__cta[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(255, 153, 0, 0.92);\n  color: #0F1111;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 10px 0;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.4px;\n  text-transform: uppercase;\n  transform: translateY(100%);\n  opacity: 0;\n  transition: transform 0.26s ease, opacity 0.2s ease;\n  z-index: 2;\n}\n.pk-tile__cta[_ngcontent-%COMP%]:hover {\n  background: rgba(232, 137, 12, 0.95);\n}\n.pk-tile__info[_ngcontent-%COMP%] {\n  padding: 10px 12px 14px;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  border-top: 1px solid var(--border);\n}\n.pk-tile__name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n  margin: 0;\n  line-height: 1.35;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pk-tile__cat[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--accent);\n  margin: 0;\n  font-weight: 600;\n}\n.pk-tile__price-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 4px;\n}\n.pk-tile__price[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text);\n  font-family: var(--font-mono);\n}\n.pk-tile__badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--success);\n  background: rgba(6, 125, 98, 0.1);\n  border-radius: 2px;\n  padding: 2px 6px;\n  text-transform: uppercase;\n  letter-spacing: 0.2px;\n}\n.pk-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  color: var(--text-muted);\n}\n.pk-empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--text);\n  margin: 16px 0 6px;\n  font-family: var(--font-display);\n}\n.pk-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n}\n.pk-empty__icon[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent" });
})();

// src/app/store/cart/cart.actions.ts
var loadCart = createAction("[Cart] Load Cart");
var loadCartSuccess = createAction("[Cart] Load Cart Success", props());
var loadCartFailure = createAction("[Cart] Load Cart Failure", props());
var increaseQuantity = createAction("[Cart] Increase Quantity", props());
var decreaseQuantity = createAction("[Cart] Decrease Quantity", props());
var quantityChangeSuccess = createAction("[Cart] Quantity Change Success");
var quantityChangeFailure = createAction("[Cart] Quantity Change Failure", props());
var applyCoupon = createAction("[Cart] Apply Coupon", props());
var applyCouponSuccess = createAction("[Cart] Apply Coupon Success");
var applyCouponFailure = createAction("[Cart] Apply Coupon Failure", props());
var removeFromCart = createAction("[Cart] Remove From Cart", props());
var removeFromCartSuccess = createAction("[Cart] Remove From Cart Success");
var removeFromCartFailure = createAction("[Cart] Remove From Cart Failure", props());

// src/app/store/cart/cart.selectors.ts
var selectCartState = createFeatureSelector("cart");
var selectCartItems = createSelector(selectCartState, (s) => s.cartItems);
var selectCartOrder = createSelector(selectCartState, (s) => s.order);
var selectCartLoading = createSelector(selectCartState, (s) => s.loading);

// src/app/customer/components/place-order/place-order.component.ts
function PlaceOrderComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14);
    \u0275\u0275element(2, "lucide-angular", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "p", 16);
    \u0275\u0275text(5, "Order Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 17);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 16);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(8, 2, ctx_r0.amount, "INR", "symbol", "1.0-0"));
  }
}
function PlaceOrderComponent_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275element(1, "lucide-angular", 19);
    \u0275\u0275text(2, " Address is required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function PlaceOrderComponent_lucide_angular_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-angular", 20);
  }
  if (rf & 2) {
    \u0275\u0275property("size", 15);
  }
}
function PlaceOrderComponent_lucide_angular_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-angular", 21);
  }
  if (rf & 2) {
    \u0275\u0275property("size", 15);
  }
}
var PlaceOrderComponent = class _PlaceOrderComponent {
  fb;
  messageService;
  customerService;
  router;
  amount = 0;
  orderPlaced = new EventEmitter();
  cancelled = new EventEmitter();
  orderForm;
  loading = false;
  constructor(fb, messageService, customerService, router) {
    this.fb = fb;
    this.messageService = messageService;
    this.customerService = customerService;
    this.router = router;
  }
  ngOnInit() {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null]
    });
  }
  placeOrder() {
    if (this.orderForm.invalid)
      return;
    this.loading = true;
    const orderDto = {
      userId: UserStorageService.getUserId(),
      address: this.orderForm.value.address,
      orderDescription: this.orderForm.value.orderDescription
    };
    this.customerService.placeOrder(orderDto).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({ severity: "success", summary: "Order Placed!", detail: "Your order has been confirmed.", life: 5e3 });
        this.orderPlaced.emit();
        this.router.navigateByUrl("/customer/my_orders");
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: "error", summary: "Error", detail: "Could not place order. Please try again.", life: 4e3 });
      }
    });
  }
  cancel() {
    this.cancelled.emit();
  }
  static \u0275fac = function PlaceOrderComponent_Factory(t) {
    return new (t || _PlaceOrderComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MessageService), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlaceOrderComponent, selectors: [["app-place-order"]], inputs: { amount: "amount" }, outputs: { orderPlaced: "orderPlaced", cancelled: "cancelled" }, decls: 22, vars: 7, consts: [["class", "bg-amber-50 rounded-lg p-4 mb-5 border border-amber-200 flex items-center gap-3", 4, "ngIf"], [1, "space-y-4", 3, "formGroup"], [1, "block", "text-xs", "font-bold", "text-gray-400", "uppercase", "tracking-widest", "mb-2"], [1, "text-red-400"], ["pInputTextarea", "", "formControlName", "address", "placeholder", "House/Flat no., Street, Area, City, State, PIN", "rows", "3"], ["class", "text-red-500 text-xs mt-1.5 flex items-center gap-1", 4, "ngIf"], [1, "text-gray-300", "font-normal", "normal-case", "tracking-normal", "ml-1"], ["pInputText", "", "formControlName", "orderDescription", "placeholder", "Any special instructions\u2026"], [1, "flex", "justify-end", "gap-3", "pt-3", "border-t", "border-gray-100"], ["type", "button", 1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "border", "border-gray-200", "text-gray-600", "rounded-lg", "font-semibold", "text-sm", "hover:bg-gray-50", "transition-colors", "disabled:opacity-50", 3, "click", "disabled"], ["type", "button", 1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "bg-amber-500", "text-gray-900", "rounded-lg", "font-semibold", "text-sm", "hover:bg-amber-400", "transition-colors", "disabled:opacity-50", 3, "click", "disabled"], ["name", "credit-card", "strokeWidth", "2", 3, "size", 4, "ngIf"], ["name", "loader-circle", "strokeWidth", "2", "class", "animate-spin", 3, "size", 4, "ngIf"], [1, "bg-amber-50", "rounded-lg", "p-4", "mb-5", "border", "border-amber-200", "flex", "items-center", "gap-3"], [1, "bg-amber-500", "rounded-lg", "p-2"], ["name", "indian-rupee", "strokeWidth", "2", 1, "text-gray-900", 3, "size"], [1, "text-xs", "text-gray-500", "font-bold", "uppercase", "tracking-wider"], [1, "text-xl", "font-bold", "text-gray-900", "font-mono"], [1, "text-red-500", "text-xs", "mt-1.5", "flex", "items-center", "gap-1"], ["name", "circle-alert", "strokeWidth", "2", 3, "size"], ["name", "credit-card", "strokeWidth", "2", 3, "size"], ["name", "loader-circle", "strokeWidth", "2", 1, "animate-spin", 3, "size"]], template: function PlaceOrderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, PlaceOrderComponent_div_0_Template, 9, 7, "div", 0);
      \u0275\u0275elementStart(1, "form", 1)(2, "div")(3, "label", 2);
      \u0275\u0275text(4, " Delivery Address ");
      \u0275\u0275elementStart(5, "span", 3);
      \u0275\u0275text(6, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(7, "textarea", 4);
      \u0275\u0275template(8, PlaceOrderComponent_p_8_Template, 3, 1, "p", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div")(10, "label", 2);
      \u0275\u0275text(11, " Order Note ");
      \u0275\u0275elementStart(12, "span", 6);
      \u0275\u0275text(13, "(optional)");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(14, "input", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 8)(16, "button", 9);
      \u0275\u0275listener("click", function PlaceOrderComponent_Template_button_click_16_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(17, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 10);
      \u0275\u0275listener("click", function PlaceOrderComponent_Template_button_click_18_listener() {
        return ctx.placeOrder();
      });
      \u0275\u0275template(19, PlaceOrderComponent_lucide_angular_19_Template, 1, 1, "lucide-angular", 11)(20, PlaceOrderComponent_lucide_angular_20_Template, 1, 1, "lucide-angular", 12);
      \u0275\u0275text(21, " Pay with Razorpay ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275property("ngIf", ctx.amount);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.orderForm);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.orderForm.get("address")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.orderForm.get("address")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(8);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.orderForm.invalid || ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
    }
  }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, InputText, InputTextarea, LucideAngularComponent, CurrencyPipe], styles: ["\n\n/*# sourceMappingURL=place-order.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlaceOrderComponent, { className: "PlaceOrderComponent" });
})();

// src/app/customer/components/cart/cart.component.ts
var _c02 = (a0, a1) => ({ items: a0, order: a1 });
var _c1 = () => ({ width: "440px" });
function CartComponent_ng_container_2_div_1_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "img", 14);
    \u0275\u0275elementStart(2, "div", 15)(3, "p", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 17)(6, "button", 18);
    \u0275\u0275listener("click", function CartComponent_ng_container_2_div_1_div_6_Template_button_click_6_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.decreaseProductQuantity(item_r2.productId));
    });
    \u0275\u0275element(7, "lucide-angular", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 20);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 21);
    \u0275\u0275listener("click", function CartComponent_ng_container_2_div_1_div_6_Template_button_click_10_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.increaseProductQuantity(item_r2.productId));
    });
    \u0275\u0275element(11, "lucide-angular", 22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 23)(13, "p", 24);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 25);
    \u0275\u0275listener("click", function CartComponent_ng_container_2_div_1_div_6_Template_button_click_16_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.removeProduct(item_r2.productId));
    });
    \u0275\u0275element(17, "lucide-angular", 26);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r2.processedImg, \u0275\u0275sanitizeUrl)("alt", item_r2.productName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.productName);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", item_r2.quantity == 1);
    \u0275\u0275advance();
    \u0275\u0275property("size", 12);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 12);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(15, 9, item_r2.price * item_r2.quantity), "");
    \u0275\u0275advance(3);
    \u0275\u0275property("size", 15);
  }
}
function CartComponent_ng_container_2_div_1_div_7_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Coupon (", vm_r5.order.couponName, ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2212\u20B9", \u0275\u0275pipeBind1(5, 2, vm_r5.order.totalAmount - vm_r5.order.amount), "");
  }
}
function CartComponent_ng_container_2_div_1_div_7_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "form", 39);
    \u0275\u0275listener("ngSubmit", function CartComponent_ng_container_2_div_1_div_7_div_23_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.applyCoupon());
    });
    \u0275\u0275element(2, "input", 40)(3, "button", 41);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r2.couponForm);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.couponForm.invalid);
  }
}
function CartComponent_ng_container_2_div_1_div_7_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275element(1, "lucide-angular", 43);
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " applied ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vm_r5.order.couponName);
  }
}
function CartComponent_ng_container_2_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "h3", 28);
    \u0275\u0275text(2, "Price Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 29)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, CartComponent_ng_container_2_div_1_div_7_div_9_Template, 6, 4, "div", 30);
    \u0275\u0275elementStart(10, "div", 31)(11, "span");
    \u0275\u0275text(12, "Delivery");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "FREE");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(15, "div", 32);
    \u0275\u0275elementStart(16, "div", 33)(17, "span");
    \u0275\u0275text(18, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(22, "div", 32);
    \u0275\u0275template(23, CartComponent_ng_container_2_div_1_div_7_div_23_Template, 4, 2, "div", 34)(24, CartComponent_ng_container_2_div_1_div_7_div_24_Template, 5, 2, "div", 35);
    \u0275\u0275elementStart(25, "button", 36);
    \u0275\u0275listener("click", function CartComponent_ng_container_2_div_1_div_7_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r4);
      const vm_r5 = \u0275\u0275nextContext(2).ngIf;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.placeOrder(vm_r5.order));
    });
    \u0275\u0275element(26, "lucide-angular", 37);
    \u0275\u0275text(27, " Place Order ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Price (", vm_r5.items.length, " items)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(8, 7, vm_r5.order.totalAmount), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", vm_r5.order.couponName);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(21, 9, vm_r5.order.amount), "");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !vm_r5.order.couponName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vm_r5.order.couponName);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 16);
  }
}
function CartComponent_ng_container_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "h2", 9);
    \u0275\u0275text(3, "My Cart ");
    \u0275\u0275elementStart(4, "span", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, CartComponent_ng_container_2_div_1_div_6_Template, 18, 11, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, CartComponent_ng_container_2_div_1_div_7_Template, 28, 11, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(vm_r5.items.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r5.items);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vm_r5.order);
  }
}
function CartComponent_ng_container_2_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "lucide-angular", 45);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Your cart is empty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Add items to get started");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "a", 46);
    \u0275\u0275text(7, " Shop Now ");
    \u0275\u0275element(8, "lucide-angular", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 56);
    \u0275\u0275advance(7);
    \u0275\u0275property("size", 16);
  }
}
function CartComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, CartComponent_ng_container_2_div_1_Template, 8, 3, "div", 6)(2, CartComponent_ng_container_2_ng_template_2_Template, 9, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r5 = ctx.ngIf;
    const emptyCart_r7 = \u0275\u0275reference(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vm_r5.items && vm_r5.items.length > 0)("ngIfElse", emptyCart_r7);
  }
}
var CartComponent = class _CartComponent {
  store;
  fb;
  cartItems$;
  order$;
  loading$;
  couponForm;
  showOrderDialog = false;
  dialogAmount = 0;
  constructor(store, fb) {
    this.store = store;
    this.fb = fb;
    this.cartItems$ = this.store.select(selectCartItems);
    this.order$ = this.store.select(selectCartOrder);
    this.loading$ = this.store.select(selectCartLoading);
  }
  ngOnInit() {
    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    });
    this.store.dispatch(loadCart());
  }
  applyCoupon() {
    const code = this.couponForm.get(["code"]).value;
    this.store.dispatch(applyCoupon({ code }));
  }
  increaseProductQuantity(productId) {
    this.store.dispatch(increaseQuantity({ productId }));
  }
  decreaseProductQuantity(productId) {
    this.store.dispatch(decreaseQuantity({ productId }));
  }
  removeProduct(productId) {
    this.store.dispatch(removeFromCart({ productId }));
  }
  placeOrder(order) {
    this.dialogAmount = order?.amount ?? 0;
    this.showOrderDialog = true;
  }
  static \u0275fac = function CartComponent_Factory(t) {
    return new (t || _CartComponent)(\u0275\u0275directiveInject(Store), \u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CartComponent, selectors: [["app-cart"]], decls: 7, vars: 15, consts: [["emptyCart", ""], ["position", "top-right"], [1, "page-wrap"], [4, "ngIf"], ["header", "Place Order", 3, "visibleChange", "visible", "modal", "closable"], [3, "orderPlaced", "cancelled", "amount"], ["class", "cart-layout", 4, "ngIf", "ngIfElse"], [1, "cart-layout"], [1, "cart-items-panel"], [1, "section-title"], [1, "count-badge"], ["class", "cart-item", 4, "ngFor", "ngForOf"], ["class", "cart-summary-panel", 4, "ngIf"], [1, "cart-item"], [1, "item-img", 3, "src", "alt"], [1, "item-info"], [1, "item-name"], [1, "qty-row"], ["type", "button", 1, "qty-btn", 3, "click", "disabled"], ["name", "minus", "strokeWidth", "2.5", 3, "size"], [1, "qty-val"], ["type", "button", 1, "qty-btn", 3, "click"], ["name", "plus", "strokeWidth", "2.5", 3, "size"], [1, "item-right"], [1, "item-total"], ["type", "button", "title", "Remove item", 1, "item-delete-btn", 3, "click"], ["name", "trash-2", "strokeWidth", "2", 3, "size"], [1, "cart-summary-panel"], [1, "panel-title"], [1, "summary-row"], ["class", "summary-row text-green", 4, "ngIf"], [1, "summary-row", "text-green"], [1, "summary-divider"], [1, "summary-row", "total-row"], ["class", "coupon-block", 4, "ngIf"], ["class", "coupon-applied", 4, "ngIf"], ["type", "button", 1, "w-full", "mt-4", "h-11", "flex", "items-center", "justify-center", "gap-2", "bg-amber-500", "text-gray-900", "rounded-lg", "font-semibold", "text-sm", "hover:bg-amber-400", "transition-colors", "place-order-btn", 3, "click"], ["name", "credit-card", "strokeWidth", "2", 3, "size"], [1, "coupon-block"], [1, "coupon-form", 3, "ngSubmit", "formGroup"], ["pInputText", "", "placeholder", "Coupon code", "formControlName", "code", 1, "coupon-input"], ["pButton", "", "type", "submit", "label", "Apply", 1, "p-button-outlined", "p-button-sm", 3, "disabled"], [1, "coupon-applied"], ["name", "circle-check", "strokeWidth", "2", 3, "size"], [1, "empty-state"], ["name", "shopping-cart", "strokeWidth", "1", 1, "empty-icon", 3, "size"], ["routerLink", "/customer/dashboard", 1, "flex", "items-center", "gap-2", "px-5", "py-2.5", "bg-amber-500", "text-gray-900", "rounded-lg", "font-semibold", "text-sm", "hover:bg-amber-400", "transition-colors", "mt-3"], ["name", "arrow-right", "strokeWidth", "2", 3, "size"]], template: function CartComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast", 1);
      \u0275\u0275elementStart(1, "div", 2);
      \u0275\u0275template(2, CartComponent_ng_container_2_Template, 4, 2, "ng-container", 3);
      \u0275\u0275pipe(3, "async");
      \u0275\u0275pipe(4, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p-dialog", 4);
      \u0275\u0275twoWayListener("visibleChange", function CartComponent_Template_p_dialog_visibleChange_5_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.showOrderDialog, $event) || (ctx.showOrderDialog = $event);
        return $event;
      });
      \u0275\u0275elementStart(6, "app-place-order", 5);
      \u0275\u0275listener("orderPlaced", function CartComponent_Template_app_place_order_orderPlaced_6_listener() {
        return ctx.showOrderDialog = false;
      })("cancelled", function CartComponent_Template_app_place_order_cancelled_6_listener() {
        return ctx.showOrderDialog = false;
      });
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", \u0275\u0275pureFunction2(11, _c02, \u0275\u0275pipeBind1(3, 7, ctx.cartItems$), \u0275\u0275pipeBind1(4, 9, ctx.order$)));
      \u0275\u0275advance(3);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(14, _c1));
      \u0275\u0275twoWayProperty("visible", ctx.showOrderDialog);
      \u0275\u0275property("modal", true)("closable", true);
      \u0275\u0275advance();
      \u0275\u0275property("amount", ctx.dialogAmount);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, ButtonDirective, InputText, Dialog, Toast, LucideAngularComponent, PlaceOrderComponent, AsyncPipe, DecimalPipe], styles: ['@charset "UTF-8";\n\n\n\n.cart-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 320px;\n  gap: 16px;\n  align-items: start;\n}\n@media (max-width: 900px) {\n  .cart-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.cart-items-panel[_ngcontent-%COMP%], \n.cart-summary-panel[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow);\n}\n.cart-items-panel[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n}\n.cart-summary-panel[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  position: sticky;\n  top: 76px;\n}\n.panel-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  font-family: var(--font-display);\n  color: var(--text);\n  margin: 0 0 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--border);\n}\n.panel-title[_ngcontent-%COMP%]   .count[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--text-muted);\n  font-size: 14px;\n}\n.cart-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 0;\n  border-bottom: 1px solid var(--border);\n}\n.cart-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.item-img[_ngcontent-%COMP%] {\n  width: 110px;\n  height: 110px;\n  object-fit: contain;\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  background: var(--bg-elevated);\n  flex-shrink: 0;\n  padding: 6px;\n}\n.item-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text);\n  margin: 0 0 4px;\n}\n.item-price[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  font-family: var(--font-mono);\n  color: var(--primary-l);\n  margin: 0 0 8px;\n}\n.qty-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.qty-btn[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1.5px solid var(--border);\n  border-radius: var(--radius);\n  background: var(--bg-elevated);\n  color: var(--text);\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n  flex-shrink: 0;\n  padding: 0;\n}\n.qty-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(255, 153, 0, 0.12);\n  border-color: var(--primary);\n}\n.qty-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.qty-val[_ngcontent-%COMP%] {\n  width: 24px;\n  text-align: center;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: var(--font-mono);\n  color: var(--text);\n}\n.item-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.item-total[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  font-family: var(--font-mono);\n  color: var(--text);\n  white-space: nowrap;\n  margin: 0;\n}\n.item-delete-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  background: transparent;\n  color: var(--text-dim);\n  border-radius: var(--radius);\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.item-delete-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(220, 38, 38, 0.1);\n  color: #dc2626;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 14px;\n  color: var(--text-muted);\n  padding: 6px 0;\n}\n.total-row[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text) !important;\n}\n.summary-divider[_ngcontent-%COMP%] {\n  border: none;\n  border-top: 1px dashed var(--border);\n  margin: 4px 0;\n}\n.coupon-block[_ngcontent-%COMP%] {\n  padding: 8px 0;\n}\n.coupon-form[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.coupon-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.coupon-applied[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  color: var(--success);\n  padding: 6px 0;\n}\n.coupon-applied[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  color: var(--text-dim);\n  display: block;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-family: var(--font-display);\n  color: var(--text);\n  margin: 0 0 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0 0 24px;\n}\n/*# sourceMappingURL=cart.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CartComponent, { className: "CartComponent" });
})();

// src/app/customer/components/my-orders/my-orders.component.ts
var _c03 = (a0) => ["/customer/ordered_products", a0];
function MyOrdersComponent_div_3_div_1_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "a", 22);
    \u0275\u0275element(2, "lucide-angular", 23);
    \u0275\u0275text(3, " Write a Review ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c03, order_r1.id));
    \u0275\u0275advance();
    \u0275\u0275property("size", 15);
  }
}
function MyOrdersComponent_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "div", 8)(3, "span", 9);
    \u0275\u0275text(4, "Tracking ID: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 10);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 11);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 12)(13, "div", 13)(14, "p", 14);
    \u0275\u0275element(15, "lucide-angular", 15);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 14);
    \u0275\u0275element(18, "lucide-angular", 16);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 17)(21, "span", 18);
    \u0275\u0275text(22, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 19);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(26, MyOrdersComponent_div_3_div_1_div_26_Template, 4, 4, "div", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r1 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(order_r1.trackingId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 17, order_r1.date, "dd MMM yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("chip-green", order_r1.orderStatus === "DELIVERED")("chip-orange", order_r1.orderStatus === "SHIPPED")("chip-blue", order_r1.orderStatus === "PLACED")("chip-red", order_r1.orderStatus === "CANCELLED");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r1.orderStatus, " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("size", 15);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r1.orderDescription, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 15);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r1.address, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(25, 20, order_r1.amount), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", order_r1.orderStatus === "DELIVERED");
  }
}
function MyOrdersComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275template(1, MyOrdersComponent_div_3_div_1_Template, 27, 22, "div", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.myOrders);
  }
}
function MyOrdersComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "lucide-angular", 25);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No orders yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "You haven't placed any orders.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "a", 26);
    \u0275\u0275text(7, "Start Shopping");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 56);
  }
}
var MyOrdersComponent = class _MyOrdersComponent {
  customerService;
  myOrders = [];
  displayedColumns = ["trackingId", "amount", "description", "address", "date", "status", "action"];
  constructor(customerService) {
    this.customerService = customerService;
  }
  ngOnInit() {
    this.getMyOrders();
  }
  getMyOrders() {
    this.customerService.getOrdersByUserId().subscribe((res) => {
      this.myOrders = res;
    });
  }
  static \u0275fac = function MyOrdersComponent_Factory(t) {
    return new (t || _MyOrdersComponent)(\u0275\u0275directiveInject(CustomerService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyOrdersComponent, selectors: [["app-my-orders"]], decls: 6, vars: 2, consts: [["noOrders", ""], [1, "page-wrap"], [1, "section-title"], ["class", "orders-list", 4, "ngIf", "ngIfElse"], [1, "orders-list"], ["class", "order-card", 4, "ngFor", "ngForOf"], [1, "order-card"], [1, "order-header"], [1, "order-meta"], [1, "tracking-id"], [1, "order-date"], [1, "status-chip"], [1, "order-body"], [1, "order-info"], [1, "info-row"], ["name", "receipt", "strokeWidth", "1.5", 3, "size"], ["name", "map-pin", "strokeWidth", "1.5", 3, "size"], [1, "order-amount"], [1, "amount-label"], [1, "amount-value"], ["class", "order-footer", 4, "ngIf"], [1, "order-footer"], [1, "btn-review", 3, "routerLink"], ["name", "pen-line", "strokeWidth", "2", 3, "size"], [1, "empty-state"], ["name", "scroll-text", "strokeWidth", "1", 1, "empty-icon", 3, "size"], ["routerLink", "/customer/dashboard", 1, "btn-shop"]], template: function MyOrdersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "h2", 2);
      \u0275\u0275text(2, "My Orders");
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, MyOrdersComponent_div_3_Template, 2, 1, "div", 3)(4, MyOrdersComponent_ng_template_4_Template, 8, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const noOrders_r3 = \u0275\u0275reference(5);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.myOrders && ctx.myOrders.length > 0)("ngIfElse", noOrders_r3);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, LucideAngularComponent, DecimalPipe, DatePipe], styles: ['@charset "UTF-8";\n\n\n\n.orders-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.order-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-sm);\n  overflow: hidden;\n  border: 1px solid var(--border);\n  transition: box-shadow 0.2s;\n}\n.order-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow);\n}\n.order-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 20px;\n  background: var(--bg-elevated);\n  border-bottom: 1px solid var(--border);\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.order-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.tracking-id[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n}\n.tracking-id[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--primary-l);\n  font-family: var(--font-mono);\n}\n.order-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-dim);\n}\n.status-chip[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.chip-green[_ngcontent-%COMP%] {\n  background: rgba(5, 150, 105, 0.1);\n  color: #059669;\n}\n.chip-orange[_ngcontent-%COMP%] {\n  background: rgba(217, 119, 6, 0.1);\n  color: #d97706;\n}\n.chip-blue[_ngcontent-%COMP%] {\n  background: rgba(109, 40, 217, 0.1);\n  color: var(--primary);\n}\n.chip-red[_ngcontent-%COMP%] {\n  background: rgba(220, 38, 38, 0.1);\n  color: #dc2626;\n}\n.order-body[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.order-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.info-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 6px;\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 0 0 6px;\n}\n.info-row[_ngcontent-%COMP%]:last-child {\n  margin: 0;\n}\n.info-row[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 16px;\n  height: 16px;\n  width: 16px;\n  color: var(--primary-l);\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.order-amount[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.amount-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-dim);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.amount-value[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: var(--font-mono);\n  color: var(--text);\n}\n.order-footer[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-top: 1px solid var(--border);\n  background: var(--bg-elevated);\n}\n.btn-review[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: var(--primary);\n  color: #fff;\n  border-radius: var(--radius);\n  padding: 7px 16px;\n  font-size: 13px;\n  font-weight: 600;\n  text-decoration: none;\n  transition: background 0.15s, box-shadow 0.15s;\n}\n.btn-review[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 16px;\n  height: 16px;\n  width: 16px;\n}\n.btn-review[_ngcontent-%COMP%]:hover {\n  background: var(--primary-h);\n  box-shadow: var(--glow);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 72px;\n  height: 72px;\n  width: 72px;\n  color: var(--text-dim);\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-family: var(--font-display);\n  color: var(--text);\n  margin: 16px 0 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0 0 24px;\n}\n.btn-shop[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: var(--primary);\n  color: #fff;\n  padding: 11px 28px;\n  border-radius: var(--radius);\n  font-size: 14px;\n  font-weight: 600;\n  text-decoration: none;\n}\n.btn-shop[_ngcontent-%COMP%]:hover {\n  background: var(--primary-h);\n}\n/*# sourceMappingURL=my-orders.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyOrdersComponent, { className: "MyOrdersComponent" });
})();

// src/app/customer/components/view-ordered-products/view-ordered-products.component.ts
var _c04 = (a0) => ["/customer/review", a0];
function ViewOrderedProductsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "img", 6);
    \u0275\u0275elementStart(2, "div", 7)(3, "p", 8);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 9);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "a", 10);
    \u0275\u0275element(9, "lucide-angular", 11);
    \u0275\u0275text(10, " Review ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", p_r1.processedImg, \u0275\u0275sanitizeUrl)("alt", p_r1.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Qty: ", p_r1.quantity, " \xA0\xB7\xA0 \u20B9", \u0275\u0275pipeBind1(7, 7, p_r1.price), " each");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c04, p_r1.id));
    \u0275\u0275advance();
    \u0275\u0275property("size", 14);
  }
}
function ViewOrderedProductsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "Total: ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(4, 1, ctx_r1.totalAmount), "");
  }
}
var ViewOrderedProductsComponent = class _ViewOrderedProductsComponent {
  activatedRoute;
  customerService;
  orderId;
  orderedProductDetailsList = [];
  totalAmount;
  constructor(activatedRoute, customerService) {
    this.activatedRoute = activatedRoute;
    this.customerService = customerService;
  }
  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params["orderId"];
    this.getOrderedProductsDetailsByOrderId();
  }
  getOrderedProductsDetailsByOrderId() {
    this.customerService.getOrderedProducts(this.orderId).subscribe((res) => {
      this.totalAmount = res.amount;
      this.orderedProductDetailsList = (res.cartItems ?? []).map((item) => __spreadProps(__spreadValues({}, item), {
        name: item.productName,
        processedImg: null
        // CartItemsDto has no image; shown as placeholder
      }));
    });
  }
  static \u0275fac = function ViewOrderedProductsComponent_Factory(t) {
    return new (t || _ViewOrderedProductsComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(CustomerService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewOrderedProductsComponent, selectors: [["app-view-ordered-products"]], decls: 6, vars: 2, consts: [[1, "page-wrap"], [1, "section-title"], [1, "ordered-list"], ["class", "ordered-item", 4, "ngFor", "ngForOf"], ["class", "ordered-total", 4, "ngIf"], [1, "ordered-item"], [1, "ordered-img", 3, "src", "alt"], [1, "ordered-info"], [1, "ordered-name"], [1, "ordered-meta"], [1, "flex", "items-center", "gap-2", "px-4", "py-2", "border", "border-amber-300", "text-amber-700", "rounded-lg", "text-sm", "font-semibold", "hover:bg-amber-50", "transition-colors", 3, "routerLink"], ["name", "star", "strokeWidth", "2", 3, "size"], [1, "ordered-total"]], template: function ViewOrderedProductsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "Order Items");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275template(4, ViewOrderedProductsComponent_div_4_Template, 11, 11, "div", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275template(5, ViewOrderedProductsComponent_div_5_Template, 5, 3, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.orderedProductDetailsList);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.totalAmount);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, LucideAngularComponent, DecimalPipe], styles: ["\n\n/*# sourceMappingURL=view-ordered-products.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewOrderedProductsComponent, { className: "ViewOrderedProductsComponent" });
})();

// src/app/customer/components/review-ordered-product/review-ordered-product.component.ts
function ReviewOrderedProductComponent_img_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 23);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.imagePreview, \u0275\u0275sanitizeUrl);
  }
}
function ReviewOrderedProductComponent_p_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275element(1, "lucide-angular", 25);
    \u0275\u0275text(2, " Please select a rating ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function ReviewOrderedProductComponent_p_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275element(1, "lucide-angular", 25);
    \u0275\u0275text(2, " Review text is required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
var ReviewOrderedProductComponent = class _ReviewOrderedProductComponent {
  fb;
  messageService;
  customerService;
  router;
  activatedRoute;
  productId;
  reviewForm;
  selectedFile;
  imagePreview;
  constructor(fb, messageService, customerService, router, activatedRoute) {
    this.fb = fb;
    this.messageService = messageService;
    this.customerService = customerService;
    this.router = router;
    this.activatedRoute = activatedRoute;
  }
  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params["productId"];
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }
  onfileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  submitForm() {
    const formdata = new FormData();
    formdata.append("img", this.selectedFile);
    formdata.append("productId", this.productId.toString());
    formdata.append("userId", UserStorageService.getUserId().toString());
    formdata.append("rating", this.reviewForm.get("rating").value);
    formdata.append("description", this.reviewForm.get("description").value);
    this.customerService.giveReview(formdata).subscribe((res) => {
      if (res != null) {
        this.messageService.add({ severity: "success", summary: "Success", detail: "Review Posted Successfully", life: 5e3 });
        this.router.navigateByUrl("/customer/my_orders");
      } else {
        this.messageService.add({ severity: "success", summary: "Success", detail: "Something went wrong", life: 5e3 });
      }
    });
  }
  static \u0275fac = function ReviewOrderedProductComponent_Factory(t) {
    return new (t || _ReviewOrderedProductComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MessageService), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReviewOrderedProductComponent, selectors: [["app-review-ordered-product"]], decls: 41, vars: 10, consts: [["position", "top-right"], [1, "min-h-screen", "bg-gray-50", "flex", "items-start", "justify-center", "px-4", "py-10"], [1, "w-full", "max-w-md"], [1, "bg-gradient-to-r", "from-gray-800", "to-gray-900", "rounded-t-2xl", "px-7", "py-6"], [1, "flex", "items-center", "gap-3"], [1, "bg-white/20", "rounded-xl", "p-2.5"], ["name", "star", "strokeWidth", "2", 1, "text-amber-400", 3, "size"], [1, "text-white", "text-xl", "font-bold", "tracking-tight"], [1, "text-gray-300", "text-sm"], [1, "bg-white", "rounded-b-2xl", "shadow-xl", "border", "border-gray-200", "px-7", "py-8"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], [1, "block", "text-xs", "font-bold", "text-gray-400", "uppercase", "tracking-widest", "mb-2"], [1, "flex", "items-center", "gap-3", "border-2", "border-dashed", "border-amber-200", "rounded-xl", "px-4", "py-4", "cursor-pointer", "text-gray-500", "text-sm", "transition-all", "hover:border-amber-400", "hover:bg-amber-50", "hover:text-amber-700"], ["name", "camera", "strokeWidth", "1.5", 1, "text-amber-500", 3, "size"], ["type", "file", "hidden", "", 3, "change"], ["class", "mt-3 w-24 h-24 object-cover rounded-xl border-2 border-gray-200 shadow-sm", 3, "src", 4, "ngIf"], [1, "text-red-400"], ["formControlName", "rating", 3, "cancel"], ["class", "text-red-500 text-xs mt-1.5 flex items-center gap-1", 4, "ngIf"], ["pInputTextarea", "", "formControlName", "description", "placeholder", "Share your honest experience \u2014 what did you love or dislike?", "rows", "5"], [1, "border-t", "border-gray-100", "pt-2"], ["type", "submit", 1, "w-full", "flex", "items-center", "justify-center", "gap-2", "py-3", "bg-amber-500", "text-gray-900", "rounded-lg", "font-bold", "text-base", "hover:bg-amber-400", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "disabled"], ["name", "send", "strokeWidth", "2", 3, "size"], [1, "mt-3", "w-24", "h-24", "object-cover", "rounded-xl", "border-2", "border-gray-200", "shadow-sm", 3, "src"], [1, "text-red-500", "text-xs", "mt-1.5", "flex", "items-center", "gap-1"], ["name", "circle-alert", "strokeWidth", "2", 3, "size"]], template: function ReviewOrderedProductComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast", 0);
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275element(6, "lucide-angular", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div")(8, "h2", 7);
      \u0275\u0275text(9, "Write a Review");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 8);
      \u0275\u0275text(11, "Share your experience with this product");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(12, "div", 9)(13, "form", 10);
      \u0275\u0275listener("ngSubmit", function ReviewOrderedProductComponent_Template_form_ngSubmit_13_listener() {
        return ctx.submitForm();
      });
      \u0275\u0275elementStart(14, "div")(15, "label", 11);
      \u0275\u0275text(16, "Review Photo (optional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "label", 12);
      \u0275\u0275element(18, "lucide-angular", 13);
      \u0275\u0275elementStart(19, "span");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "input", 14);
      \u0275\u0275listener("change", function ReviewOrderedProductComponent_Template_input_change_21_listener($event) {
        return ctx.onfileSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(22, ReviewOrderedProductComponent_img_22_Template, 1, 1, "img", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div")(24, "label", 11);
      \u0275\u0275text(25, " Rating ");
      \u0275\u0275elementStart(26, "span", 16);
      \u0275\u0275text(27, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(28, "p-rating", 17);
      \u0275\u0275template(29, ReviewOrderedProductComponent_p_29_Template, 3, 1, "p", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div")(31, "label", 11);
      \u0275\u0275text(32, " Review ");
      \u0275\u0275elementStart(33, "span", 16);
      \u0275\u0275text(34, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(35, "textarea", 19);
      \u0275\u0275template(36, ReviewOrderedProductComponent_p_36_Template, 3, 1, "p", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275element(37, "div", 20);
      \u0275\u0275elementStart(38, "button", 21);
      \u0275\u0275element(39, "lucide-angular", 22);
      \u0275\u0275text(40, " Submit Review ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_7_0;
      \u0275\u0275advance(6);
      \u0275\u0275property("size", 20);
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.reviewForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("size", 18);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.selectedFile ? ctx.selectedFile.name : "Upload a photo (optional)");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.imagePreview);
      \u0275\u0275advance(6);
      \u0275\u0275property("cancel", false);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.reviewForm.get("rating")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.reviewForm.get("rating")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.reviewForm.get("description")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.reviewForm.get("description")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.reviewForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275property("size", 16);
    }
  }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, Toast, InputTextarea, Rating, LucideAngularComponent], styles: ["\n\n/*# sourceMappingURL=review-ordered-product.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReviewOrderedProductComponent, { className: "ReviewOrderedProductComponent" });
})();

// src/app/customer/components/view-product-detail/view-product-detail.component.ts
function ViewProductDetailComponent_div_0_section_21_div_4_img_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 29);
  }
  if (rf & 2) {
    const review_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", review_r3.processedImg, \u0275\u0275sanitizeUrl)("alt", review_r3.description);
  }
}
function ViewProductDetailComponent_div_0_section_21_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275template(1, ViewProductDetailComponent_div_0_section_21_div_4_img_1_Template, 1, 2, "img", 22);
    \u0275\u0275elementStart(2, "div", 23)(3, "div", 24)(4, "span", 25);
    \u0275\u0275text(5);
    \u0275\u0275element(6, "lucide-angular", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 27);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 28);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const review_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", review_r3.processedImg);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", review_r3.rating, " ");
    \u0275\u0275advance();
    \u0275\u0275property("size", 11);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(review_r3.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2014 ", review_r3.username, "");
  }
}
function ViewProductDetailComponent_div_0_section_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 17)(1, "h2", 18);
    \u0275\u0275text(2, "Customer Reviews");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19);
    \u0275\u0275template(4, ViewProductDetailComponent_div_0_section_21_div_4_Template, 11, 5, "div", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.reviews);
  }
}
function ViewProductDetailComponent_div_0_section_22_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "p", 33);
    \u0275\u0275element(2, "lucide-angular", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const faq_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 16);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", faq_r4.question, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(faq_r4.answer);
  }
}
function ViewProductDetailComponent_div_0_section_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 17)(1, "h2", 18);
    \u0275\u0275text(2, "Frequently Asked Questions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 30);
    \u0275\u0275template(4, ViewProductDetailComponent_div_0_section_22_div_4_Template, 6, 3, "div", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.FAQS);
  }
}
function ViewProductDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
    \u0275\u0275element(3, "img", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 5)(5, "p", 6);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h1", 7);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 8);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 9)(12, "span", 10);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 11);
    \u0275\u0275element(15, "lucide-angular", 12);
    \u0275\u0275text(16, " Free Delivery ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 13)(18, "button", 14);
    \u0275\u0275listener("click", function ViewProductDetailComponent_div_0_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addToWishlist());
    });
    \u0275\u0275element(19, "lucide-angular", 15);
    \u0275\u0275text(20, " Wishlist ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(21, ViewProductDetailComponent_div_0_section_21_Template, 5, 1, "section", 16)(22, ViewProductDetailComponent_div_0_section_22_Template, 5, 1, "section", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r1.product.processedImg, \u0275\u0275sanitizeUrl)("alt", ctx_r1.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.product.categoryName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.product.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r1.product.price, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 15);
    \u0275\u0275advance(4);
    \u0275\u0275property("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.reviews.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.FAQS.length > 0);
  }
}
var ViewProductDetailComponent = class _ViewProductDetailComponent {
  messageService;
  customerService;
  activatedRouter;
  productId;
  product;
  FAQS = [];
  reviews = [];
  constructor(messageService, customerService, activatedRouter) {
    this.messageService = messageService;
    this.customerService = customerService;
    this.activatedRouter = activatedRouter;
  }
  ngOnInit() {
    this.productId = this.activatedRouter.snapshot.params["productId"];
    this.getProductDetailsById();
  }
  getProductDetailsById() {
    this.customerService.getProductDetailById(this.productId).subscribe((res) => {
      if (res.productDto) {
        this.product = res.productDto;
        if (this.product.byteImg) {
          this.product.processedImg = "data:image/png;base64," + this.product.byteImg;
        } else {
          console.error("byteImg is undefined or null");
        }
        this.FAQS = res.faqDtoList || [];
        (res.reviewDtoList || []).forEach((element) => {
          if (element.returnedImg) {
            element.processedImg = "data:image/png;base64," + element.returnedImg;
          }
          this.reviews.push(element);
        });
      } else {
        console.error("productDto is undefined or null");
      }
    }, (error) => {
      console.error("Error fetching product details:", error);
    });
  }
  addToWishlist() {
    const wishListDto = {
      productId: this.productId,
      userId: UserStorageService.getUserId()
    };
    this.customerService.addProductToWishlist(wishListDto).subscribe((res) => {
      this.messageService.add({ severity: "success", summary: "Success", detail: "Product added to wishlist successfully", life: 5e3 });
    }, (error) => {
      if (error.status === 409) {
        this.messageService.add({ severity: "warn", summary: "Already in Wishlist", detail: error.error || "Product already in wishlist", life: 5e3 });
      } else if (error.status === 400) {
        this.messageService.add({ severity: "error", summary: "Error", detail: "Invalid product or user", life: 5e3 });
      } else {
        this.messageService.add({ severity: "error", summary: "Error", detail: "Something went wrong", life: 5e3 });
      }
    });
  }
  static \u0275fac = function ViewProductDetailComponent_Factory(t) {
    return new (t || _ViewProductDetailComponent)(\u0275\u0275directiveInject(MessageService), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewProductDetailComponent, selectors: [["app-view-product-detail"]], decls: 1, vars: 1, consts: [["class", "page-wrap", 4, "ngIf"], [1, "page-wrap"], [1, "product-hero"], [1, "hero-img-wrap"], [1, "hero-img", 3, "src", "alt"], [1, "hero-details"], [1, "hero-category"], [1, "hero-name"], [1, "hero-desc"], [1, "hero-price-block"], [1, "hero-price"], [1, "free-delivery"], ["name", "truck", "strokeWidth", "2", 3, "size"], [1, "hero-actions"], [1, "btn-wishlist", 3, "click"], ["name", "heart", "strokeWidth", "2", 3, "size"], ["class", "section-block", 4, "ngIf"], [1, "section-block"], [1, "section-title"], [1, "reviews-grid"], ["class", "review-card", 4, "ngFor", "ngForOf"], [1, "review-card"], ["loading", "lazy", "class", "review-img", 3, "src", "alt", 4, "ngIf"], [1, "review-body"], [1, "review-rating"], [1, "rating-badge"], ["name", "star", "strokeWidth", "2", 2, "fill", "currentColor", "display", "inline-block", "vertical-align", "middle", 3, "size"], [1, "review-text"], [1, "review-user"], ["loading", "lazy", 1, "review-img", 3, "src", "alt"], [1, "faq-list"], ["class", "faq-item", 4, "ngFor", "ngForOf"], [1, "faq-item"], [1, "faq-q"], ["name", "circle-question-mark", "strokeWidth", "1.5", 3, "size"], [1, "faq-a"]], template: function ViewProductDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, ViewProductDetailComponent_div_0_Template, 23, 10, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.product);
    }
  }, dependencies: [NgForOf, NgIf, LucideAngularComponent], styles: ['@charset "UTF-8";\n\n\n\n.product-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 420px 1fr;\n  gap: 32px;\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow);\n  padding: 32px;\n  margin-bottom: 24px;\n}\n@media (max-width: 768px) {\n  .product-hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.hero-img-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  padding: 32px;\n  min-height: 340px;\n  overflow: hidden;\n  background: var(--bg-elevated);\n  position: relative;\n  transition: box-shadow 0.25s ease;\n}\n.hero-img-wrap[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background-image:\n    radial-gradient(\n      circle,\n      rgba(124, 58, 237, 0.08) 1px,\n      transparent 1px);\n  background-size: 20px 20px;\n  pointer-events: none;\n}\n.hero-img-wrap[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-lg);\n}\n.hero-img-wrap[_ngcontent-%COMP%]:hover   .hero-img[_ngcontent-%COMP%] {\n  transform: scale(1.06);\n}\n.hero-img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 360px;\n  object-fit: contain;\n  position: relative;\n  z-index: 1;\n  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5));\n  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  transform-origin: center center;\n}\n.hero-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.hero-category[_ngcontent-%COMP%] {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: var(--primary-l);\n  font-weight: 700;\n  margin: 0;\n}\n.hero-name[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 26px;\n  font-weight: 700;\n  color: var(--text);\n  margin: 0;\n  line-height: 1.3;\n}\n.hero-desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-muted);\n  margin: 0;\n  line-height: 1.6;\n}\n.hero-price-block[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.hero-price[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 700;\n  font-family: var(--font-mono);\n  color: var(--text);\n}\n.free-delivery[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 13px;\n  color: var(--success);\n  font-weight: 500;\n  background: rgba(16, 185, 129, 0.1);\n  padding: 4px 10px;\n  border-radius: 999px;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  margin-top: 8px;\n}\n.btn-wishlist[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: transparent;\n  color: var(--primary-l);\n  border: 1.5px solid var(--primary);\n  border-radius: var(--radius);\n  padding: 11px 24px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, box-shadow 0.15s;\n  font-family: var(--font-ui);\n}\n.btn-wishlist[_ngcontent-%COMP%]:hover {\n  background: var(--primary-glow);\n  box-shadow: var(--glow);\n}\n.section-block[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-sm);\n  padding: 24px;\n  margin-bottom: 16px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: var(--text);\n  margin: 0 0 16px;\n  padding-bottom: 10px;\n  border-bottom: 2px solid var(--primary);\n  display: inline-block;\n}\n.reviews-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 12px;\n}\n.review-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 16px;\n  display: flex;\n  gap: 12px;\n  background: var(--bg-elevated);\n  transition: border-color 0.15s;\n}\n.review-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n}\n.review-img[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  object-fit: cover;\n  border-radius: var(--radius);\n  flex-shrink: 0;\n  border: 1px solid var(--border);\n}\n.review-body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.rating-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  background: rgba(5, 150, 105, 0.12);\n  color: var(--success);\n  border: 1px solid rgba(5, 150, 105, 0.2);\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.review-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 8px 0 4px;\n  line-height: 1.5;\n}\n.review-user[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-dim);\n  margin: 0;\n}\n.faq-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.faq-item[_ngcontent-%COMP%] {\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 14px 16px;\n  background: var(--bg-elevated);\n  transition: border-color 0.15s;\n}\n.faq-item[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n}\n.faq-q[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 6px;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text);\n  margin: 0 0 6px;\n}\n.faq-q[_ngcontent-%COMP%]   lucide-angular[_ngcontent-%COMP%] {\n  color: var(--primary-l);\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.faq-a[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 0;\n  padding-left: 22px;\n  line-height: 1.5;\n}\n/*# sourceMappingURL=view-product-detail.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewProductDetailComponent, { className: "ViewProductDetailComponent" });
})();

// src/app/customer/components/view-wishlist/view-wishlist.component.ts
var _c05 = (a0) => ["/customer/product", a0];
function ViewWishlistComponent_ng_container_3_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "button", 8);
    \u0275\u0275listener("click", function ViewWishlistComponent_ng_container_3_div_1_div_1_Template_button_click_1_listener() {
      const p_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.removeFromWishlist(p_r2.productId));
    });
    \u0275\u0275element(2, "lucide-angular", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 10);
    \u0275\u0275element(4, "img", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 12)(6, "p", 13);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 14);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 15);
    \u0275\u0275listener("click", function ViewWishlistComponent_ng_container_3_div_1_div_1_Template_button_click_10_listener() {
      const p_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.moveToCart(p_r2.productId));
    });
    \u0275\u0275element(11, "lucide-angular", 16);
    \u0275\u0275text(12, " Add to Cart ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 14);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c05, p_r2.productId));
    \u0275\u0275advance();
    \u0275\u0275property("src", p_r2.processedImg, \u0275\u0275sanitizeUrl)("alt", p_r2.productName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r2.productName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", p_r2.price, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 14);
  }
}
function ViewWishlistComponent_ng_container_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275template(1, ViewWishlistComponent_ng_container_3_div_1_div_1_Template, 13, 9, "div", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const products_r4 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", products_r4);
  }
}
function ViewWishlistComponent_ng_container_3_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "lucide-angular", 18);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Your wishlist is empty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Save items you love");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "a", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 56);
  }
}
function ViewWishlistComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, ViewWishlistComponent_ng_container_3_div_1_Template, 2, 1, "div", 4)(2, ViewWishlistComponent_ng_container_3_ng_template_2_Template, 7, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const products_r4 = ctx.ngIf;
    const empty_r5 = \u0275\u0275reference(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", products_r4.length > 0)("ngIfElse", empty_r5);
  }
}
var ViewWishlistComponent = class _ViewWishlistComponent {
  store;
  customerService;
  messageService;
  products$;
  constructor(store, customerService, messageService) {
    this.store = store;
    this.customerService = customerService;
    this.messageService = messageService;
    this.products$ = this.store.select(selectWishlistProducts);
  }
  ngOnInit() {
    this.store.dispatch(loadWishlist());
  }
  removeFromWishlist(productId) {
    this.store.dispatch(removeFromWishlist({ productId }));
  }
  moveToCart(productId) {
    this.customerService.addToCart(productId).subscribe({
      next: () => this.messageService.add({ severity: "success", summary: "Success", detail: "Added to cart!", life: 2e3 }),
      error: () => this.messageService.add({ severity: "error", summary: "Error", detail: "Could not add to cart", life: 2e3 })
    });
  }
  static \u0275fac = function ViewWishlistComponent_Factory(t) {
    return new (t || _ViewWishlistComponent)(\u0275\u0275directiveInject(Store), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(MessageService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewWishlistComponent, selectors: [["app-view-wishlist"]], decls: 5, vars: 3, consts: [["empty", ""], [1, "page-wrap"], [1, "section-title"], [4, "ngIf"], ["class", "wl-grid", 4, "ngIf", "ngIfElse"], [1, "wl-grid"], ["class", "wl-card", 4, "ngFor", "ngForOf"], [1, "wl-card"], ["pTooltip", "Remove", 1, "wl-remove", 3, "click"], ["name", "x", "strokeWidth", "2.5", 3, "size"], [1, "wl-img-box", 3, "routerLink"], [1, "wl-img", 3, "src", "alt"], [1, "wl-info"], [1, "wl-name"], [1, "wl-price"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-center", "gap-2", "px-3", "py-2", "border", "border-amber-300", "text-amber-700", "rounded-lg", "text-sm", "font-semibold", "hover:bg-amber-50", "transition-colors", "mt-2", "wl-cart-btn", 3, "click"], ["name", "shopping-cart", "strokeWidth", "2", 3, "size"], [1, "empty-state"], ["name", "heart", "strokeWidth", "1", 1, "empty-icon", 3, "size"], ["pButton", "", "routerLink", "/customer/dashboard", "label", "Start Shopping"]], template: function ViewWishlistComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "h2", 2);
      \u0275\u0275text(2, "My Wishlist");
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, ViewWishlistComponent_ng_container_3_Template, 4, 2, "ng-container", 3);
      \u0275\u0275pipe(4, "async");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(4, 1, ctx.products$));
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, ButtonDirective, Tooltip, LucideAngularComponent, AsyncPipe], styles: ["\n\n.wl-page[_ngcontent-%COMP%] {\n  padding: 16px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.wl-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 1px;\n  background: var(--border);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n}\n@media (max-width: 1200px) {\n  .wl-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n@media (max-width: 900px) {\n  .wl-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 580px) {\n  .wl-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.wl-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  transition: box-shadow 0.2s;\n}\n.wl-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-lg);\n  z-index: 2;\n}\n.wl-remove[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  z-index: 3;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: 1px solid var(--border);\n  background: rgba(15, 15, 24, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity 0.15s, background 0.15s;\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  color: var(--text-muted);\n}\n.wl-remove[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.wl-remove[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.2);\n  color: #f87171;\n  border-color: rgba(239, 68, 68, 0.3);\n}\n.wl-card[_ngcontent-%COMP%]:hover   .wl-remove[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.wl-img-box[_ngcontent-%COMP%] {\n  height: 200px;\n  overflow: hidden;\n  background: var(--bg-elevated);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.wl-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 16px;\n  transition: transform 0.35s ease;\n  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));\n}\n.wl-card[_ngcontent-%COMP%]:hover   .wl-img[_ngcontent-%COMP%] {\n  transform: scale(1.08);\n}\n.wl-info[_ngcontent-%COMP%] {\n  padding: 10px 12px 6px;\n  flex: 1;\n  border-top: 1px solid var(--border);\n}\n.wl-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n  margin: 0 0 4px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  line-height: 1.35;\n}\n.wl-price[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  font-family: var(--font-mono);\n  color: var(--primary-l);\n  margin: 0;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  color: var(--text-dim);\n  display: block;\n  margin: 0 auto 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: var(--font-display);\n  color: var(--text);\n  margin: 0 0 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-muted);\n  margin: 0 0 20px;\n}\n/*# sourceMappingURL=view-wishlist.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewWishlistComponent, { className: "ViewWishlistComponent" });
})();

// src/app/customer/components/profile/profile.component.ts
function ProfileComponent_ng_container_24_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "First name is required");
    \u0275\u0275elementEnd();
  }
}
function ProfileComponent_ng_container_24_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Valid email is required");
    \u0275\u0275elementEnd();
  }
}
function ProfileComponent_ng_container_24_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function ProfileComponent_ng_container_24_button_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePersonalEdit());
    });
    \u0275\u0275element(1, "lucide-angular", 29);
    \u0275\u0275text(2, " Update Details ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 15);
  }
}
function ProfileComponent_ng_container_24_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "button", 30);
    \u0275\u0275element(2, "lucide-angular", 31);
    \u0275\u0275text(3, " Save Changes ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 32);
    \u0275\u0275listener("click", function ProfileComponent_ng_container_24_ng_container_28_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePersonalEdit());
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 15);
  }
}
function ProfileComponent_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 13)(2, "h3", 14);
    \u0275\u0275text(3, "Personal Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 15);
    \u0275\u0275text(5, "Update your name, email address and phone number.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "form", 16);
    \u0275\u0275listener("ngSubmit", function ProfileComponent_ng_container_24_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateProfile());
    });
    \u0275\u0275elementStart(7, "div", 17)(8, "div", 18)(9, "label", 19);
    \u0275\u0275text(10, "First Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 20);
    \u0275\u0275template(12, ProfileComponent_ng_container_24_span_12_Template, 2, 0, "span", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 18)(14, "label", 19);
    \u0275\u0275text(15, "Last Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 18)(18, "label", 19);
    \u0275\u0275text(19, "Email Address");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "input", 23);
    \u0275\u0275template(21, ProfileComponent_ng_container_24_span_21_Template, 2, 0, "span", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 18)(23, "label", 19);
    \u0275\u0275text(24, "Phone Number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 25);
    \u0275\u0275template(27, ProfileComponent_ng_container_24_button_27_Template, 3, 1, "button", 26)(28, ProfileComponent_ng_container_24_ng_container_28_Template, 6, 1, "ng-container", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r1.personalForm);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.personalForm.get("firstName")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.personalForm.get("firstName")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.personalForm.get("email")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.personalForm.get("email")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", !ctx_r1.isEditingPersonal);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEditingPersonal);
  }
}
function ProfileComponent_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 13)(2, "h3", 14);
    \u0275\u0275text(3, "My Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 15);
    \u0275\u0275text(5, "Manage your default delivery address.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "form", 16);
    \u0275\u0275listener("ngSubmit", function ProfileComponent_ng_container_25_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateProfile());
    });
    \u0275\u0275elementStart(7, "div", 18)(8, "label", 19);
    \u0275\u0275text(9, "Street / Flat / Area");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 17)(12, "div", 18)(13, "label", 19);
    \u0275\u0275text(14, "City");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 18)(17, "label", 19);
    \u0275\u0275text(18, "State");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 17)(21, "div", 18)(22, "label", 19);
    \u0275\u0275text(23, "Zip / Pin Code");
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "input", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 18)(26, "label", 19);
    \u0275\u0275text(27, "Country");
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "input", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "button", 30);
    \u0275\u0275element(30, "lucide-angular", 31);
    \u0275\u0275text(31, " Update Address ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r1.addressForm);
    \u0275\u0275advance(24);
    \u0275\u0275property("size", 15);
  }
}
function ProfileComponent_ng_container_26_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Saved: ", ctx_r1.maskedCard, "");
  }
}
function ProfileComponent_ng_container_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 13)(2, "h3", 14);
    \u0275\u0275text(3, "Card Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 15);
    \u0275\u0275text(5, "Save your credit or debit card for faster checkout.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "form", 16);
    \u0275\u0275listener("ngSubmit", function ProfileComponent_ng_container_26_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateProfile());
    });
    \u0275\u0275elementStart(7, "div", 18)(8, "label", 19);
    \u0275\u0275text(9, "Card Holder Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 18)(12, "label", 19);
    \u0275\u0275text(13, "Card Number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 39);
    \u0275\u0275template(15, ProfileComponent_ng_container_26_span_15_Template, 2, 1, "span", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 17)(17, "div", 18)(18, "label", 19);
    \u0275\u0275text(19, "Expiry (MM/YY)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "input", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 18)(22, "label", 19);
    \u0275\u0275text(23, "CVV");
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "input", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 18)(26, "label", 19);
    \u0275\u0275text(27, "Card Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "select", 43)(29, "option", 44);
    \u0275\u0275text(30, "Select type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 45);
    \u0275\u0275text(32, "Visa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 46);
    \u0275\u0275text(34, "MasterCard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 47);
    \u0275\u0275text(36, "RuPay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 48);
    \u0275\u0275text(38, "Amex");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "button", 30);
    \u0275\u0275element(40, "lucide-angular", 31);
    \u0275\u0275text(41, " Update Card ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r1.cardForm);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r1.profile == null ? null : ctx_r1.profile.cardNumber);
    \u0275\u0275advance(25);
    \u0275\u0275property("size", 15);
  }
}
var ProfileComponent = class _ProfileComponent {
  fb;
  customerService;
  messageService;
  activeSection = "personal";
  isEditingPersonal = false;
  userId;
  profile = {};
  personalForm;
  addressForm;
  cardForm;
  constructor(fb, customerService, messageService) {
    this.fb = fb;
    this.customerService = customerService;
    this.messageService = messageService;
  }
  ngOnInit() {
    this.userId = Number(UserStorageService.getUserId());
    this.buildForms();
    this.loadProfile();
  }
  buildForms() {
    this.personalForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: [""],
      email: ["", [Validators.required, Validators.email]],
      phone: [""]
    });
    this.personalForm.disable();
    this.addressForm = this.fb.group({
      street: [""],
      city: [""],
      state: [""],
      zipCode: [""],
      country: [""]
    });
    this.cardForm = this.fb.group({
      cardHolderName: [""],
      cardNumber: [""],
      cardExpiry: [""],
      cardType: [""],
      cardCvv: [""]
    });
  }
  loadProfile() {
    this.customerService.getUserProfile(this.userId).subscribe({
      next: (data) => {
        this.profile = data;
        const nameParts = (data.name || "").trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ");
        this.personalForm.patchValue({ firstName, lastName, email: data.email, phone: data.phone });
        this.addressForm.patchValue({ street: data.street, city: data.city, state: data.state, zipCode: data.zipCode, country: data.country });
        this.cardForm.patchValue({ cardHolderName: data.cardHolderName, cardNumber: data.cardNumber, cardExpiry: data.cardExpiry, cardType: data.cardType, cardCvv: data.cardCvv });
      },
      error: () => this.messageService.add({ severity: "error", summary: "Error", detail: "Failed to load profile" })
    });
  }
  selectSection(section) {
    this.activeSection = section;
  }
  togglePersonalEdit() {
    if (this.isEditingPersonal) {
      const nameParts = (this.profile?.name || "").trim().split(" ");
      this.personalForm.patchValue({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" "),
        email: this.profile?.email,
        phone: this.profile?.phone
      });
      this.personalForm.disable();
      this.isEditingPersonal = false;
    } else {
      this.personalForm.enable();
      this.isEditingPersonal = true;
    }
  }
  get maskedCard() {
    const num = this.profile?.cardNumber;
    if (!num || num.length < 4)
      return num || "";
    return "**** **** **** " + num.slice(-4);
  }
  updateProfile() {
    let payload = {};
    if (this.activeSection === "personal") {
      if (this.personalForm.invalid) {
        this.personalForm.markAllAsTouched();
        return;
      }
      const { firstName, lastName, email, phone } = this.personalForm.getRawValue();
      payload = { name: [firstName, lastName].filter(Boolean).join(" "), email, phone };
    } else if (this.activeSection === "address") {
      payload = this.addressForm.value;
    } else {
      payload = this.cardForm.value;
    }
    this.customerService.updateUserProfile(this.userId, payload).subscribe({
      next: (data) => {
        this.profile = data;
        if (this.activeSection === "personal") {
          this.personalForm.disable();
          this.isEditingPersonal = false;
        }
        this.messageService.add({ severity: "success", summary: "Saved", detail: "Profile updated successfully" });
      },
      error: () => this.messageService.add({ severity: "error", summary: "Error", detail: "Failed to update profile" })
    });
  }
  static \u0275fac = function ProfileComponent_Factory(t) {
    return new (t || _ProfileComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(MessageService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], decls: 27, vars: 15, consts: [[1, "page-wrap"], [1, "pf-header"], [1, "pf-avatar"], [1, "pf-title"], [1, "pf-subtitle"], [1, "pf-layout"], [1, "pf-sidebar"], [1, "pf-nav-item", 3, "click"], ["name", "user", "strokeWidth", "2", 3, "size"], ["name", "map-pin", "strokeWidth", "2", 3, "size"], ["name", "credit-card", "strokeWidth", "2", 3, "size"], [1, "pf-panel"], [4, "ngIf"], [1, "pf-panel__head"], [1, "pf-panel__title"], [1, "pf-panel__desc"], [1, "pf-form", 3, "ngSubmit", "formGroup"], [1, "pf-row"], [1, "pf-field"], [1, "pf-label"], ["formControlName", "firstName", "placeholder", "First name", 1, "pf-input"], ["class", "pf-error", 4, "ngIf"], ["formControlName", "lastName", "placeholder", "Last name", 1, "pf-input"], ["formControlName", "email", "type", "email", "placeholder", "Enter your email", 1, "pf-input"], ["formControlName", "phone", "placeholder", "Enter your phone number", 1, "pf-input"], [1, "pf-actions"], ["class", "pf-save-btn", "type", "button", 3, "click", 4, "ngIf"], [1, "pf-error"], ["type", "button", 1, "pf-save-btn", 3, "click"], ["name", "pencil", "strokeWidth", "2", 3, "size"], ["type", "submit", 1, "pf-save-btn"], ["name", "save", "strokeWidth", "2", 3, "size"], ["type", "button", 1, "pf-cancel-btn", 3, "click"], ["formControlName", "street", "placeholder", "House no., Street, Area", 1, "pf-input"], ["formControlName", "city", "placeholder", "City", 1, "pf-input"], ["formControlName", "state", "placeholder", "State", 1, "pf-input"], ["formControlName", "zipCode", "placeholder", "Zip Code", 1, "pf-input"], ["formControlName", "country", "placeholder", "Country", 1, "pf-input"], ["formControlName", "cardHolderName", "placeholder", "Name on card", 1, "pf-input"], ["formControlName", "cardNumber", "placeholder", "1234 5678 9012 3456", "maxlength", "19", 1, "pf-input"], ["class", "pf-hint", 4, "ngIf"], ["formControlName", "cardExpiry", "placeholder", "MM/YY", "maxlength", "5", 1, "pf-input"], ["formControlName", "cardCvv", "placeholder", "\u2022\u2022\u2022", "maxlength", "4", "type", "password", 1, "pf-input"], ["formControlName", "cardType", 1, "pf-input", "pf-select"], ["value", ""], ["value", "Visa"], ["value", "MasterCard"], ["value", "RuPay"], ["value", "Amex"], [1, "pf-hint"]], template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div")(5, "h2", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 5)(10, "aside", 6)(11, "button", 7);
      \u0275\u0275listener("click", function ProfileComponent_Template_button_click_11_listener() {
        return ctx.selectSection("personal");
      });
      \u0275\u0275element(12, "lucide-angular", 8);
      \u0275\u0275elementStart(13, "span");
      \u0275\u0275text(14, "Personal Details");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "button", 7);
      \u0275\u0275listener("click", function ProfileComponent_Template_button_click_15_listener() {
        return ctx.selectSection("address");
      });
      \u0275\u0275element(16, "lucide-angular", 9);
      \u0275\u0275elementStart(17, "span");
      \u0275\u0275text(18, "My Address");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "button", 7);
      \u0275\u0275listener("click", function ProfileComponent_Template_button_click_19_listener() {
        return ctx.selectSection("card");
      });
      \u0275\u0275element(20, "lucide-angular", 10);
      \u0275\u0275elementStart(21, "span");
      \u0275\u0275text(22, "Card Details");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 11);
      \u0275\u0275template(24, ProfileComponent_ng_container_24_Template, 29, 5, "ng-container", 12)(25, ProfileComponent_ng_container_25_Template, 32, 2, "ng-container", 12)(26, ProfileComponent_ng_container_26_Template, 42, 3, "ng-container", 12);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate((ctx.profile == null ? null : ctx.profile.name == null ? null : (tmp_0_0 = ctx.profile.name.charAt(0)) == null ? null : tmp_0_0.toUpperCase()) || "?");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate((ctx.profile == null ? null : ctx.profile.name) || "My Profile");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.profile == null ? null : ctx.profile.email);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("pf-nav-item--active", ctx.activeSection === "personal");
      \u0275\u0275advance();
      \u0275\u0275property("size", 16);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("pf-nav-item--active", ctx.activeSection === "address");
      \u0275\u0275advance();
      \u0275\u0275property("size", 16);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("pf-nav-item--active", ctx.activeSection === "card");
      \u0275\u0275advance();
      \u0275\u0275property("size", 16);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.activeSection === "personal");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeSection === "address");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeSection === "card");
    }
  }, dependencies: [NgIf, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, LucideAngularComponent], styles: ['@charset "UTF-8";\n\n\n\n.pf-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  padding: 20px 24px;\n  box-shadow: var(--shadow-sm);\n  margin-bottom: 16px;\n}\n.pf-avatar[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: var(--primary);\n  color: #0F1111;\n  font-size: 22px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.pf-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text);\n  margin: 0 0 2px;\n  font-family: var(--font-display);\n}\n.pf-subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 0;\n}\n.pf-layout[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;\n}\n.pf-sidebar[_ngcontent-%COMP%] {\n  width: 220px;\n  flex-shrink: 0;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-sm);\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.pf-nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  padding: 11px 14px;\n  border: none;\n  border-radius: var(--radius);\n  background: transparent;\n  color: var(--text-muted);\n  font-size: 14px;\n  font-family: var(--font-ui);\n  font-weight: 500;\n  cursor: pointer;\n  text-align: left;\n  transition: background 0.15s, color 0.15s;\n}\n.pf-nav-item[_ngcontent-%COMP%]:hover {\n  background: var(--bg-elevated);\n  color: var(--text);\n}\n.pf-nav-item--active[_ngcontent-%COMP%] {\n  background: rgba(255, 153, 0, 0.12);\n  color: var(--primary-dark);\n  font-weight: 700;\n}\n.pf-nav-item--active[_ngcontent-%COMP%]   lucide-angular[_ngcontent-%COMP%] {\n  color: var(--primary-dark);\n}\n.pf-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-sm);\n  padding: 24px 28px;\n  min-height: 360px;\n}\n.pf-panel__head[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding-bottom: 16px;\n  border-bottom: 1.5px solid var(--border);\n}\n.pf-panel__title[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--text);\n  margin: 0 0 4px;\n  font-family: var(--font-display);\n}\n.pf-panel__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 0;\n}\n.pf-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.pf-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.pf-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.pf-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n}\n.pf-input[_ngcontent-%COMP%] {\n  height: 42px;\n  padding: 0 12px;\n  border: 1.5px solid var(--border);\n  border-radius: var(--radius);\n  background: var(--bg-elevated);\n  color: var(--text);\n  font-size: 14px;\n  font-family: var(--font-ui);\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n  width: 100%;\n  box-sizing: border-box;\n}\n.pf-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--border-focus);\n  box-shadow: var(--glow);\n}\n.pf-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-dim);\n}\n.pf-select[_ngcontent-%COMP%] {\n  appearance: none;\n  cursor: pointer;\n}\n.pf-error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #dc2626;\n}\n.pf-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n}\n.pf-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 4px;\n}\n.pf-save-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  align-self: flex-start;\n  background: var(--primary);\n  color: #0F1111;\n  border: none;\n  border-radius: var(--radius);\n  padding: 10px 22px;\n  font-size: 14px;\n  font-weight: 700;\n  font-family: var(--font-ui);\n  cursor: pointer;\n  transition: background 0.15s, box-shadow 0.15s;\n}\n.pf-save-btn[_ngcontent-%COMP%]:hover {\n  background: var(--primary-h);\n  box-shadow: var(--glow);\n}\n.pf-cancel-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background: transparent;\n  color: var(--text-muted);\n  border: 1.5px solid var(--border);\n  border-radius: var(--radius);\n  padding: 10px 18px;\n  font-size: 14px;\n  font-weight: 600;\n  font-family: var(--font-ui);\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.pf-cancel-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-elevated);\n  color: var(--text);\n}\n@media (max-width: 700px) {\n  .pf-layout[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .pf-sidebar[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 4px;\n  }\n  .pf-nav-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 4px;\n    font-size: 11px;\n    padding: 8px 12px;\n    flex-shrink: 0;\n  }\n  .pf-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=profile.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent" });
})();

// src/app/customer/customer-routing.module.ts
var routes = [
  { path: "", component: CustomerComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "cart", component: CartComponent },
  { path: "my_orders", component: MyOrdersComponent },
  { path: "ordered_products/:orderId", component: ViewOrderedProductsComponent },
  { path: "review/:productId", component: ReviewOrderedProductComponent },
  { path: "product/:productId", component: ViewProductDetailComponent },
  { path: "wishlist", component: ViewWishlistComponent },
  { path: "profile", component: ProfileComponent }
];
var CustomerRoutingModule = class _CustomerRoutingModule {
  static \u0275fac = function CustomerRoutingModule_Factory(t) {
    return new (t || _CustomerRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CustomerRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};

// src/app/store/cart/cart.reducer.ts
var initialCartState = {
  order: null,
  cartItems: [],
  loading: false,
  error: null
};
var cartReducer = createReducer(initialCartState, on(loadCart, (state) => __spreadProps(__spreadValues({}, state), { loading: true, error: null })), on(loadCartSuccess, (state, { order, cartItems }) => __spreadProps(__spreadValues({}, state), { order, cartItems, loading: false })), on(loadCartFailure, (state, { error }) => __spreadProps(__spreadValues({}, state), { loading: false, error })), on(increaseQuantity, decreaseQuantity, removeFromCart, (state) => __spreadProps(__spreadValues({}, state), { loading: true })), on(applyCoupon, (state) => __spreadProps(__spreadValues({}, state), { loading: true, error: null })), on(applyCouponSuccess, (state) => __spreadProps(__spreadValues({}, state), { loading: false })), on(applyCouponFailure, (state, { error }) => __spreadProps(__spreadValues({}, state), { loading: false, error })));

// src/app/store/wishlist/wishlist.reducer.ts
var initialWishlistState = {
  products: [],
  ids: [],
  loading: false,
  loaded: false,
  error: null
};
var wishlistReducer = createReducer(initialWishlistState, on(loadWishlist, (state) => __spreadProps(__spreadValues({}, state), { loading: true, error: null })), on(loadWishlistSuccess, (state, { products, ids }) => __spreadProps(__spreadValues({}, state), { products, ids, loading: false, loaded: true })), on(loadWishlistFailure, (state, { error }) => __spreadProps(__spreadValues({}, state), { loading: false, error })), on(addToWishlist, (state) => __spreadProps(__spreadValues({}, state), { loading: true })), on(addToWishlistSuccess, (state, { productId }) => __spreadProps(__spreadValues({}, state), {
  ids: [...state.ids, productId],
  loading: false
})), on(addToWishlistFailure, (state, { error }) => __spreadProps(__spreadValues({}, state), { loading: false, error })), on(removeFromWishlist, (state) => __spreadProps(__spreadValues({}, state), { loading: true })), on(removeFromWishlistSuccess, (state, { productId }) => __spreadProps(__spreadValues({}, state), {
  ids: state.ids.filter((id) => id !== productId),
  products: state.products.filter((p) => (p.productId ?? p.id) !== productId),
  loading: false
})), on(removeFromWishlistFailure, (state, { error }) => __spreadProps(__spreadValues({}, state), { loading: false, error })));

// src/app/store/cart/cart.effects.ts
var CartEffects = class _CartEffects {
  actions$ = inject(Actions);
  customerService = inject(CustomerService);
  messageService = inject(MessageService);
  loadCart$ = createEffect(() => this.actions$.pipe(ofType(loadCart), switchMap(() => this.customerService.getCartByUserId().pipe(map((res) => {
    const cartItems = (res.cartItems ?? []).map((item) => __spreadProps(__spreadValues({}, item), {
      processedImg: item.returnedImg ? "data:image/jpeg;base64," + item.returnedImg : null
    }));
    return loadCartSuccess({ order: res, cartItems });
  }), catchError((err) => of(loadCartFailure({ error: err.message ?? "Failed to load cart" })))))));
  increaseQuantity$ = createEffect(() => this.actions$.pipe(ofType(increaseQuantity), switchMap(({ productId }) => this.customerService.increaseProductQuantity(productId).pipe(map(() => {
    this.messageService.add({ severity: "success", summary: "Cart", detail: "Quantity increased", life: 2e3 });
    return quantityChangeSuccess();
  }), catchError((err) => of(quantityChangeFailure({ error: err.message })))))));
  decreaseQuantity$ = createEffect(() => this.actions$.pipe(ofType(decreaseQuantity), switchMap(({ productId }) => this.customerService.descreaseProductQuantity(productId).pipe(map(() => {
    this.messageService.add({ severity: "info", summary: "Cart", detail: "Quantity decreased", life: 2e3 });
    return quantityChangeSuccess();
  }), catchError((err) => of(quantityChangeFailure({ error: err.message })))))));
  reloadAfterQuantityChange$ = createEffect(() => this.actions$.pipe(ofType(quantityChangeSuccess), map(() => loadCart())));
  applyCoupon$ = createEffect(() => this.actions$.pipe(ofType(applyCoupon), switchMap(({ code }) => this.customerService.applyCoupon(code).pipe(map(() => {
    this.messageService.add({ severity: "success", summary: "Coupon Applied", detail: "Discount applied to your order", life: 3e3 });
    return applyCouponSuccess();
  }), catchError((err) => {
    this.messageService.add({ severity: "error", summary: "Invalid Coupon", detail: err.error ?? "Failed to apply coupon", life: 4e3 });
    return of(applyCouponFailure({ error: err.error }));
  })))));
  reloadAfterCoupon$ = createEffect(() => this.actions$.pipe(ofType(applyCouponSuccess), map(() => loadCart())));
  removeFromCart$ = createEffect(() => this.actions$.pipe(ofType(removeFromCart), switchMap(({ productId }) => this.customerService.removeFromCart(productId).pipe(map(() => {
    this.messageService.add({ severity: "success", summary: "Cart", detail: "Item removed", life: 2e3 });
    return removeFromCartSuccess();
  }), catchError((err) => of(removeFromCartFailure({ error: err.message })))))));
  reloadAfterRemove$ = createEffect(() => this.actions$.pipe(ofType(removeFromCartSuccess), map(() => loadCart())));
  static \u0275fac = function CartEffects_Factory(t) {
    return new (t || _CartEffects)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CartEffects, factory: _CartEffects.\u0275fac });
};

// src/app/store/wishlist/wishlist.effects.ts
var WishlistEffects = class _WishlistEffects {
  actions$ = inject(Actions);
  customerService = inject(CustomerService);
  messageService = inject(MessageService);
  loadWishlist$ = createEffect(() => this.actions$.pipe(ofType(loadWishlist), switchMap(() => this.customerService.getWishlistByUserId().pipe(map((res) => {
    const products = res.map((item) => __spreadProps(__spreadValues({}, item), {
      processedImg: item.byteImg ? "data:image/jpeg;base64," + item.byteImg : null
    }));
    const ids = res.map((item) => item.productId ?? item.product?.id ?? item.id);
    return loadWishlistSuccess({ products, ids });
  }), catchError((err) => of(loadWishlistFailure({ error: err.message ?? "Failed to load wishlist" })))))));
  addToWishlist$ = createEffect(() => this.actions$.pipe(ofType(addToWishlist), switchMap(({ productId }) => {
    const dto = { userId: UserStorageService.getUserId(), productId };
    return this.customerService.addProductToWishlist(dto).pipe(map(() => {
      this.messageService.add({ severity: "success", summary: "Wishlist", detail: "Added to wishlist!", life: 2e3 });
      return addToWishlistSuccess({ productId });
    }), catchError(() => {
      this.messageService.add({ severity: "error", summary: "Wishlist", detail: "Could not add to wishlist", life: 2e3 });
      return of(addToWishlistFailure({ error: "Failed" }));
    }));
  })));
  removeFromWishlist$ = createEffect(() => this.actions$.pipe(ofType(removeFromWishlist), switchMap(({ productId }) => this.customerService.removeFromWishlist(productId).pipe(map(() => {
    this.messageService.add({ severity: "info", summary: "Wishlist", detail: "Removed from wishlist", life: 2e3 });
    return removeFromWishlistSuccess({ productId });
  }), catchError(() => {
    this.messageService.add({ severity: "error", summary: "Wishlist", detail: "Could not remove from wishlist", life: 2e3 });
    return of(removeFromWishlistFailure({ error: "Failed" }));
  })))));
  static \u0275fac = function WishlistEffects_Factory(t) {
    return new (t || _WishlistEffects)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WishlistEffects, factory: _WishlistEffects.\u0275fac });
};

// src/app/customer/customer.module.ts
var CustomerModule = class _CustomerModule {
  static \u0275fac = function CustomerModule_Factory(t) {
    return new (t || _CustomerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CustomerModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ providers: [MessageService], imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    HttpClientModule,
    StoreModule.forFeature("cart", cartReducer),
    StoreModule.forFeature("wishlist", wishlistReducer),
    EffectsModule.forFeature([CartEffects, WishlistEffects])
  ] });
};
export {
  CustomerModule
};
//# sourceMappingURL=chunk-M4W6AGGH.js.map
