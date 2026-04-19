import {
  ActivatedRoute,
  Calendar,
  Card,
  CommonModule,
  CurrencyPipe,
  DatePipe,
  DefaultValueAccessor,
  Dropdown,
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
  MaxValidator,
  MessageService,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  PrimeNGModule,
  PrimeTemplate,
  ReactiveFormsModule,
  Router,
  RouterLink,
  RouterModule,
  SelectControlValueAccessor,
  Table,
  Tag,
  Toast,
  Tooltip,
  UIChart,
  UserStorageService,
  Validators,
  __spreadProps,
  __spreadValues,
  environment,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
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

// src/app/admin/admin.component.ts
var AdminComponent = class _AdminComponent {
  static \u0275fac = function AdminComponent_Factory(t) {
    return new (t || _AdminComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminComponent, selectors: [["app-admin"]], decls: 2, vars: 0, template: function AdminComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "admin works!");
      \u0275\u0275elementEnd();
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminComponent, { className: "AdminComponent" });
})();

// src/app/admin/service/admin.service.ts
var AdminService = class _AdminService {
  http;
  constructor(http) {
    this.http = http;
  }
  addCategory(categoryDto) {
    return this.http.post(environment.apiUrl + "api/admin/categories", categoryDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  getAllCategories() {
    return this.http.get(environment.apiUrl + "api/admin/categories", {
      headers: this.createAuthorizationHeader()
    });
  }
  updateCategory(id, categoryDto) {
    return this.http.put(environment.apiUrl + `api/admin/categories/${id}`, categoryDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  deleteCategory(id) {
    return this.http.delete(environment.apiUrl + `api/admin/categories/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  addProduct(productDto) {
    return this.http.post(environment.apiUrl + "api/admin/products", productDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  updateProduct(productId, productDto) {
    return this.http.put(environment.apiUrl + `api/admin/products/${productId}`, productDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  getAllProducts() {
    return this.http.get(environment.apiUrl + "api/admin/products", {
      headers: this.createAuthorizationHeader()
    });
  }
  getProductById(productId) {
    return this.http.get(environment.apiUrl + `api/admin/products/${productId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  getAllProductsByName(name) {
    return this.http.get(environment.apiUrl + `api/admin/products/search?name=${encodeURIComponent(name)}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  deleteProduct(productId) {
    return this.http.delete(environment.apiUrl + `api/admin/products/${productId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  addCoupon(couponDto) {
    return this.http.post(environment.apiUrl + "api/admin/coupons", couponDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  getAllCoupons() {
    return this.http.get(environment.apiUrl + "api/admin/coupons", {
      headers: this.createAuthorizationHeader()
    });
  }
  getCouponsByMonthYear(month, year) {
    return this.http.get(environment.apiUrl + `api/admin/coupons?month=${month}&year=${year}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  updateCoupon(id, couponDto) {
    return this.http.put(environment.apiUrl + `api/admin/coupons/${id}`, couponDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  deleteCoupon(id) {
    return this.http.delete(environment.apiUrl + `api/admin/coupons/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  getPlacedOrders() {
    return this.http.get(environment.apiUrl + "api/admin/orders", {
      headers: this.createAuthorizationHeader()
    });
  }
  changeOrderStatus(orderId, status) {
    return this.http.get(environment.apiUrl + `api/admin/orders/${orderId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  postFAQ(productId, FaqDto) {
    const faqWithProduct = __spreadProps(__spreadValues({}, FaqDto), { productId });
    return this.http.post(environment.apiUrl + `api/admin/faq`, faqWithProduct, {
      headers: this.createAuthorizationHeader()
    });
  }
  getAnalytics() {
    return this.http.get(environment.apiUrl + "api/admin/orders/analytics", {
      headers: this.createAuthorizationHeader()
    });
  }
  getSalesChart(fromYear, toYear) {
    return this.http.get(environment.apiUrl + `api/admin/sales-chart?fromYear=${fromYear}&toYear=${toYear}`, { headers: this.createAuthorizationHeader() });
  }
  getSalesReport(type, params) {
    let queryParams = `type=${type}`;
    for (const key of Object.keys(params)) {
      queryParams += `&${key}=${params[key]}`;
    }
    return this.http.get(environment.apiUrl + `api/admin/sales-report?${queryParams}`, {
      headers: this.createAuthorizationHeader(),
      responseType: "blob"
    });
  }
  createAuthorizationHeader() {
    return new HttpHeaders().set("Authorization", "Bearer " + UserStorageService.getToken());
  }
  static \u0275fac = function AdminService_Factory(t) {
    return new (t || _AdminService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminService, factory: _AdminService.\u0275fac, providedIn: "root" });
};

// src/app/admin/components/dashboard/dashboard.component.ts
var _c0 = (a0) => ["/admin/faq", a0];
var _c1 = (a0) => ["/admin/product", a0];
function DashboardComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15);
    \u0275\u0275element(2, "img", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17)(4, "p", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3", 19);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 20);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 21)(11, "span", 22);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 23)(14, "button", 24);
    \u0275\u0275element(15, "lucide-angular", 25);
    \u0275\u0275text(16, " FAQ ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 26);
    \u0275\u0275element(18, "lucide-angular", 27);
    \u0275\u0275text(19, " Edit ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 28);
    \u0275\u0275listener("click", function DashboardComponent_div_17_Template_button_click_20_listener() {
      const product_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteProduct(product_r2.id));
    });
    \u0275\u0275element(21, "lucide-angular", 29);
    \u0275\u0275text(22, " Delete ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", product_r2.processedImg, \u0275\u0275sanitizeUrl)("alt", product_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r2.categoryName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r2.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", product_r2.price, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(11, _c0, product_r2.id));
    \u0275\u0275advance();
    \u0275\u0275property("size", 14);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c1, product_r2.id));
    \u0275\u0275advance();
    \u0275\u0275property("size", 14);
    \u0275\u0275advance(3);
    \u0275\u0275property("size", 14);
  }
}
function DashboardComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275element(1, "lucide-angular", 31);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No products yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Add your first product to get started.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 48);
  }
}
var DashboardComponent = class _DashboardComponent {
  adminService;
  fb;
  messageService;
  products = [];
  searchProductForm;
  constructor(adminService, fb, messageService) {
    this.adminService = adminService;
    this.fb = fb;
    this.messageService = messageService;
  }
  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }
  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe((res) => {
      res.forEach((element) => {
        element.processedImg = "data:image/jpeg;base64," + element.byteImg;
        this.products.push(element);
      });
    });
  }
  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get("title").value;
    this.adminService.getAllProductsByName(title).subscribe((res) => {
      res.forEach((element) => {
        element.processedImg = "data:image/jpeg;base64," + element.byteImg;
        this.products.push(element);
      });
    });
  }
  deleteProduct(productId) {
    this.adminService.deleteProduct(productId).subscribe((res) => {
      if (res == null) {
        this.messageService.add({ severity: "success", summary: "Success", detail: "Product Deleted SuccessFully", life: 5e3 });
        this.getAllProducts();
      } else {
        this.messageService.add({ severity: "error", summary: "Error", detail: res.message, life: 5e3 });
      }
    });
  }
  static \u0275fac = function DashboardComponent_Factory(t) {
    return new (t || _DashboardComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MessageService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 19, vars: 6, consts: [[1, "page-wrap"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "section-title", "mb-1"], [1, "text-sm", 2, "color", "var(--text-muted)"], ["routerLink", "/admin/product", 1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "font-semibold", "text-sm", "rounded-lg", "transition-colors", 2, "background", "#131921", "color", "#fff"], ["name", "plus", "strokeWidth", "2.5", 3, "size"], [1, "search-bar", 3, "submit", "formGroup"], [1, "search-inner"], ["name", "search", "strokeWidth", "1.5", 1, "search-icon", 3, "size"], ["formControlName", "title", "placeholder", "Search products by name\u2026", "autocomplete", "off", 1, "search-input"], ["type", "submit", 1, "search-btn", 3, "disabled"], [1, "product-grid"], ["class", "product-card", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "product-card"], [1, "card-img-wrap"], ["loading", "lazy", 1, "card-img", 3, "src", "alt"], [1, "card-body"], [1, "card-category"], [1, "card-name"], [1, "card-desc"], [1, "card-meta"], [1, "meta-price"], [1, "card-actions"], [1, "action-btn", "btn-faq", 3, "routerLink"], ["name", "message-circle-question-mark", "strokeWidth", "2", 3, "size"], [1, "action-btn", "btn-update", 3, "routerLink"], ["name", "pencil", "strokeWidth", "2", 3, "size"], [1, "action-btn", "btn-delete", 3, "click"], ["name", "trash-2", "strokeWidth", "2", 3, "size"], [1, "empty-state"], ["name", "package", "strokeWidth", "1", 2, "color", "var(--text-dim)", 3, "size"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, "Products");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Manage your product catalogue");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "a", 4);
      \u0275\u0275element(8, "lucide-angular", 5);
      \u0275\u0275text(9, " Add Product ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "form", 6);
      \u0275\u0275listener("submit", function DashboardComponent_Template_form_submit_10_listener() {
        return ctx.submitForm();
      });
      \u0275\u0275elementStart(11, "div", 7);
      \u0275\u0275element(12, "lucide-angular", 8)(13, "input", 9);
      \u0275\u0275elementStart(14, "button", 10);
      \u0275\u0275text(15, "Search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 11);
      \u0275\u0275template(17, DashboardComponent_div_17_Template, 23, 15, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275template(18, DashboardComponent_div_18_Template, 6, 1, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("size", 15);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.searchProductForm);
      \u0275\u0275advance(2);
      \u0275\u0275property("size", 18);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.searchProductForm.invalid);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.products);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (ctx.products == null ? null : ctx.products.length) === 0);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, LucideAngularComponent], styles: ["\n\n/*# sourceMappingURL=dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent" });
})();

// src/app/admin/components/post-category/post-category.component.ts
function PostCategoryComponent_p_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275element(1, "lucide-angular", 28);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function PostCategoryComponent_p_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275element(1, "lucide-angular", 28);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function PostCategoryComponent_div_50_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 33);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 34);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td")(8, "div", 35)(9, "button", 36);
    \u0275\u0275listener("click", function PostCategoryComponent_div_50_tr_13_Template_button_click_9_listener() {
      const c_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editCategory(c_r2));
    });
    \u0275\u0275element(10, "lucide-angular", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 38);
    \u0275\u0275listener("click", function PostCategoryComponent_div_50_tr_13_Template_button_click_11_listener() {
      const c_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteCategory(c_r2));
    });
    \u0275\u0275element(12, "lucide-angular", 39);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    const i_r4 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r4 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r2.description);
    \u0275\u0275advance(4);
    \u0275\u0275property("size", 14);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 14);
  }
}
function PostCategoryComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "table", 30)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Action");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, PostCategoryComponent_div_50_tr_13_Template, 13, 5, "tr", 31);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r2.categories);
  }
}
function PostCategoryComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275element(1, "lucide-angular", 41);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No categories yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Add your first category using the form on the left.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 44);
  }
}
var PostCategoryComponent = class _PostCategoryComponent {
  fb;
  messageService;
  adminService;
  categories = [];
  categoryForm;
  editingCategory = null;
  constructor(fb, messageService, adminService) {
    this.fb = fb;
    this.messageService = messageService;
    this.adminService = adminService;
  }
  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
    this.getCategories();
  }
  getCategories() {
    this.adminService.getAllCategories().subscribe((res) => {
      this.categories = Array.isArray(res) ? res : res ? [res] : [];
    });
  }
  submitForm() {
    if (this.editingCategory) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }
  addCategory() {
    if (this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe((res) => {
        if (res.id != null) {
          this.messageService.add({ severity: "success", summary: "Success", detail: "Category added successfully", life: 4e3 });
          this.categoryForm.reset();
          this.getCategories();
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res.message, life: 4e3 });
        }
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
  editCategory(category) {
    this.editingCategory = category;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  cancelEdit() {
    this.editingCategory = null;
    this.categoryForm.reset();
  }
  deleteCategory(category) {
    this.adminService.deleteCategory(category.id).subscribe({
      next: () => {
        this.messageService.add({ severity: "success", summary: "Deleted", detail: "Category deleted successfully", life: 4e3 });
        if (this.editingCategory?.id === category.id)
          this.cancelEdit();
        this.getCategories();
      },
      error: () => this.messageService.add({ severity: "error", summary: "Error", detail: "Failed to delete category", life: 4e3 })
    });
  }
  updateCategory() {
    if (this.categoryForm.valid) {
      this.adminService.updateCategory(this.editingCategory.id, this.categoryForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: "success", summary: "Updated", detail: "Category updated successfully", life: 4e3 });
          this.editingCategory = null;
          this.categoryForm.reset();
          this.getCategories();
        },
        error: () => this.messageService.add({ severity: "error", summary: "Error", detail: "Failed to update category", life: 4e3 })
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
  static \u0275fac = function PostCategoryComponent_Factory(t) {
    return new (t || _PostCategoryComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MessageService), \u0275\u0275directiveInject(AdminService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PostCategoryComponent, selectors: [["app-post-category"]], decls: 52, vars: 19, consts: [["position", "top-right"], [1, "page-wrap"], [1, "mb-6"], [1, "section-title", "mb-1"], [1, "text-sm", 2, "color", "var(--text-muted)"], [1, "cat-split"], [1, "cat-form-card"], [1, "cat-form-header"], [1, "icon-wrap"], ["strokeWidth", "1.5", 3, "name", "size"], [1, "cat-form-body"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "form-group"], [2, "color", "var(--danger)"], ["pInputText", "", "formControlName", "name", "placeholder", "e.g. Electronics"], ["class", "field-error flex items-center gap-1", 4, "ngIf"], ["pInputTextarea", "", "formControlName", "description", "placeholder", "Brief description of this category\u2026", "rows", "4"], [2, "border-top", "1px solid var(--border)", "padding-top", ".75rem", "display", "flex", "gap", ".75rem"], ["type", "submit", "onmouseenter", "if(!this.disabled)this.style.background='var(--primary-h)'", "onmouseleave", "this.style.background='var(--primary)'", 1, "flex-1", "h-11", "flex", "items-center", "justify-center", "gap-2", "rounded-lg", "font-bold", "text-sm", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 2, "background", "var(--primary)", "color", "#0F1111", 3, "disabled"], ["strokeWidth", "2.5", 3, "name", "size"], ["type", "button", 1, "h-11", "px-4", "flex", "items-center", "gap-2", "rounded-lg", "font-bold", "text-sm", "border", "transition-colors", 2, "border-color", "var(--border)", "color", "var(--text-muted)", "background", "transparent", 3, "click"], [1, "cat-panel"], [1, "cat-panel-header"], ["name", "layout-grid", "strokeWidth", "1.5", 3, "size"], [1, "cat-panel-body"], ["class", "cat-table-wrap", 4, "ngIf"], ["class", "cat-empty", 4, "ngIf"], [1, "field-error", "flex", "items-center", "gap-1"], ["name", "circle-alert", "strokeWidth", "2", 3, "size"], [1, "cat-table-wrap"], [1, "cat-table"], [4, "ngFor", "ngForOf"], [1, "ct-index"], [1, "ct-name"], [1, "ct-desc"], [2, "display", "flex", "gap", ".4rem"], ["title", "Edit category", 1, "ct-edit-btn", 3, "click"], ["name", "pencil", "strokeWidth", "2", 3, "size"], ["title", "Delete category", 1, "ct-delete-btn", 3, "click"], ["name", "trash-2", "strokeWidth", "2", 3, "size"], [1, "cat-empty"], ["name", "layers", "strokeWidth", "1", 2, "color", "var(--text-dim)", 3, "size"]], template: function PostCategoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast", 0);
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Categories");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Create and manage product categories");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "div", 7)(10, "div", 8);
      \u0275\u0275element(11, "lucide-angular", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div")(13, "h3");
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "p");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 10)(18, "form", 11);
      \u0275\u0275listener("ngSubmit", function PostCategoryComponent_Template_form_ngSubmit_18_listener() {
        return ctx.submitForm();
      });
      \u0275\u0275elementStart(19, "div", 12)(20, "label");
      \u0275\u0275text(21, "Name ");
      \u0275\u0275elementStart(22, "span", 13);
      \u0275\u0275text(23, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(24, "input", 14);
      \u0275\u0275template(25, PostCategoryComponent_p_25_Template, 3, 1, "p", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 12)(27, "label");
      \u0275\u0275text(28, "Description ");
      \u0275\u0275elementStart(29, "span", 13);
      \u0275\u0275text(30, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(31, "textarea", 16);
      \u0275\u0275template(32, PostCategoryComponent_p_32_Template, 3, 1, "p", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 17)(34, "button", 18);
      \u0275\u0275element(35, "lucide-angular", 19);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 20);
      \u0275\u0275listener("click", function PostCategoryComponent_Template_button_click_37_listener() {
        return ctx.cancelEdit();
      });
      \u0275\u0275element(38, "lucide-angular", 19);
      \u0275\u0275text(39);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(40, "div", 21)(41, "div", 22)(42, "div", 8);
      \u0275\u0275element(43, "lucide-angular", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div")(45, "h3");
      \u0275\u0275text(46, "All Categories");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "p");
      \u0275\u0275text(48);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(49, "div", 24);
      \u0275\u0275template(50, PostCategoryComponent_div_50_Template, 14, 1, "div", 25)(51, PostCategoryComponent_div_51_Template, 6, 1, "div", 26);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275advance(11);
      \u0275\u0275property("name", ctx.editingCategory ? "pencil" : "layers")("size", 20);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.editingCategory ? "Edit Category" : "Add Category");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.editingCategory ? "Update category details below" : "Create a new product category");
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.categoryForm);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.categoryForm.get("name")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.categoryForm.get("name")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.categoryForm.get("description")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.categoryForm.get("description")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.categoryForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275property("name", ctx.editingCategory ? "save" : "plus")("size", 16);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.editingCategory ? "Update Category" : "Add Category", " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("name", ctx.editingCategory ? "x" : "refresh-cw")("size", 16);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.editingCategory ? "Cancel" : "Reset", " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("size", 20);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("", (ctx.categories == null ? null : ctx.categories.length) || 0, " categor", (ctx.categories == null ? null : ctx.categories.length) !== 1 ? "ies" : "y", " found");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.categories && ctx.categories.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.categories || ctx.categories.length === 0);
    }
  }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, InputText, Toast, InputTextarea, LucideAngularComponent], styles: ["/* src/app/admin/components/post-category/post-category.component.scss */\n.cat-split {\n  display: grid;\n  grid-template-columns: 360px 1fr;\n  gap: 1.75rem;\n  align-items: start;\n}\n@media (max-width: 900px) {\n  .cat-split {\n    grid-template-columns: 1fr;\n  }\n}\n.cat-panel .cat-panel-header,\n.cat-form-card .cat-form-header {\n  display: flex;\n  align-items: center;\n  gap: 0.875rem;\n  padding: 1.25rem 1.5rem;\n  background: #131921;\n}\n.cat-panel .cat-panel-header .icon-wrap,\n.cat-form-card .cat-form-header .icon-wrap {\n  width: 38px;\n  height: 38px;\n  border-radius: 9px;\n  background: rgba(255, 255, 255, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  flex-shrink: 0;\n}\n.cat-panel .cat-panel-header h3,\n.cat-form-card .cat-form-header h3 {\n  color: #fff;\n  font-size: 1rem;\n  font-weight: 700;\n  margin: 0;\n}\n.cat-panel .cat-panel-header p,\n.cat-form-card .cat-form-header p {\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 0.78rem;\n  margin: 0;\n}\n.cat-form-card {\n  border-radius: 14px;\n  overflow: hidden;\n  border: 1.5px solid var(--border);\n  box-shadow: var(--shadow);\n  position: sticky;\n  top: 76px;\n}\n.cat-form-card .cat-form-body {\n  padding: 1.5rem;\n  background: var(--bg-card);\n}\n.cat-panel {\n  border-radius: 14px;\n  overflow: hidden;\n  border: 1.5px solid var(--border);\n  box-shadow: var(--shadow);\n}\n.cat-panel .cat-panel-body {\n  padding: 1.5rem;\n  background: var(--bg-card);\n}\n.cat-table-wrap {\n  overflow-x: auto;\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n}\n.cat-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.85rem;\n}\n.cat-table thead tr {\n  background: var(--bg-elevated);\n  border-bottom: 1.5px solid var(--border);\n}\n.cat-table th {\n  padding: 0.75rem 1rem;\n  text-align: left;\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: var(--text-muted);\n  white-space: nowrap;\n}\n.cat-table tbody tr {\n  border-bottom: 1px solid var(--border);\n  transition: background 0.12s;\n}\n.cat-table tbody tr:last-child {\n  border-bottom: none;\n}\n.cat-table tbody tr:hover {\n  background: var(--bg-elevated);\n}\n.cat-table td {\n  padding: 0.75rem 1rem;\n  color: var(--text);\n  vertical-align: middle;\n}\n.ct-index {\n  color: var(--text-muted);\n  font-size: 0.78rem;\n  width: 40px;\n}\n.ct-name {\n  font-weight: 600;\n  white-space: nowrap;\n}\n.ct-desc {\n  color: var(--text-muted);\n  font-size: 0.82rem;\n  max-width: 340px;\n}\n.ct-edit-btn,\n.ct-delete-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border-radius: 7px;\n  border: 1.5px solid var(--border);\n  background: transparent;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    color 0.12s,\n    border-color 0.12s;\n}\n.ct-edit-btn:hover {\n  background: var(--primary);\n  color: #0F1111;\n  border-color: var(--primary);\n}\n.ct-delete-btn:hover {\n  background: var(--danger);\n  color: #fff;\n  border-color: var(--danger);\n}\n.cat-empty {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: var(--text-muted);\n}\n.cat-empty h3 {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--text);\n  margin: 0.75rem 0 0.4rem;\n}\n.cat-empty p {\n  font-size: 0.85rem;\n  margin: 0;\n}\n/*# sourceMappingURL=post-category.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PostCategoryComponent, { className: "PostCategoryComponent" });
})();

// src/app/admin/components/post-product/post-product.component.ts
function PostProductComponent_img_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 28);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.imagePreview, \u0275\u0275sanitizeUrl);
  }
}
function PostProductComponent_p_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275element(1, "lucide-angular", 30);
    \u0275\u0275text(2, " Category is required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function PostProductComponent_p_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275element(1, "lucide-angular", 30);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function PostProductComponent_p_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275element(1, "lucide-angular", 30);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function PostProductComponent_p_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275element(1, "lucide-angular", 30);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
var PostProductComponent = class _PostProductComponent {
  fb;
  router;
  messageService;
  adminService;
  productForm;
  listofCategories = [];
  selectedFile;
  imagePreview;
  constructor(fb, router, messageService, adminService) {
    this.fb = fb;
    this.router = router;
    this.messageService = messageService;
    this.adminService = adminService;
  }
  onFileSelected(event) {
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
  ngOnInit() {
    this.productForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required]
    });
    this.getAllCategories();
  }
  getAllCategories() {
    this.adminService.getAllCategories().subscribe((res) => {
      this.listofCategories = res;
    });
  }
  addProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append("img", this.selectedFile);
      formData.append("categoryId", this.productForm.get("categoryId").value);
      formData.append("name", this.productForm.get("name").value);
      formData.append("description", this.productForm.get("description").value);
      formData.append("price", this.productForm.get("price").value);
      this.adminService.addProduct(formData).subscribe((res) => {
        if (res != null) {
          this.messageService.add({ severity: "success", summary: "Success", detail: "Product Posted SuccessFully", life: 5e3 });
          this.router.navigateByUrl("/admin/dashboard");
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res?.message || "Failed to post product", life: 5e3 });
        }
      });
    } else {
      for (const i in this.productForm.controls) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
  static \u0275fac = function PostProductComponent_Factory(t) {
    return new (t || _PostProductComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MessageService), \u0275\u0275directiveInject(AdminService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PostProductComponent, selectors: [["app-post-product"]], decls: 56, vars: 12, consts: [["position", "top-right"], [1, "min-h-screen", "flex", "items-start", "justify-center", "px-4", "py-10", 2, "background", "var(--bg-base)"], [1, "w-full", "max-w-lg"], [1, "rounded-t-2xl", "px-7", "py-6", 2, "background", "#131921"], [1, "flex", "items-center", "gap-3"], [1, "rounded-xl", "p-2.5", 2, "background", "rgba(255,255,255,0.12)"], ["name", "shopping-bag", "strokeWidth", "1.5", 1, "text-white", 3, "size"], [1, "text-white", "text-xl", "font-bold", "tracking-tight"], [1, "text-sm", 2, "color", "rgba(255,255,255,0.55)"], [1, "rounded-b-2xl", "shadow-xl", "px-7", "py-8", 2, "background", "#fff", "border", "1.5px solid var(--border)", "border-top", "none"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], [1, "block", "text-xs", "font-bold", "uppercase", "tracking-widest", "mb-2", 2, "color", "var(--text-muted)"], ["onmouseenter", "this.style.borderColor='var(--primary)';this.style.background='rgba(255,153,0,0.04)';this.style.color='var(--primary-dark)'", "onmouseleave", "this.style.borderColor='var(--border)';this.style.background='';this.style.color='var(--text-muted)'", 1, "flex", "items-center", "gap-3", "border-2", "border-dashed", "rounded-xl", "px-4", "py-4", "cursor-pointer", "text-sm", "transition-all", 2, "border-color", "var(--border)", "color", "var(--text-muted)"], ["name", "camera", "strokeWidth", "1.5", 2, "color", "var(--primary)", "flex-shrink", "0", 3, "size"], ["type", "file", "hidden", "", 3, "change"], ["class", "mt-3 w-24 h-24 object-cover rounded-xl shadow-sm", "style", "border:1.5px solid var(--border)", 3, "src", 4, "ngIf"], [1, "form-group"], [2, "color", "var(--danger)"], ["formControlName", "categoryId", "optionLabel", "name", "optionValue", "id", "placeholder", "Select a category", 3, "options"], ["class", "field-error flex items-center gap-1", 4, "ngIf"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "1rem"], [1, "form-group", 2, "margin-bottom", "0"], ["pInputText", "", "formControlName", "name", "placeholder", "Product name"], ["pInputText", "", "type", "number", "formControlName", "price", "placeholder", "0.00"], ["pInputTextarea", "", "formControlName", "description", "placeholder", "Describe the product\u2026", "rows", "4"], [2, "border-top", "1px solid var(--border)", "padding-top", ".5rem"], ["type", "submit", "onmouseenter", "if(!this.disabled)this.style.background='var(--primary-h)'", "onmouseleave", "this.style.background='var(--primary)'", 1, "w-full", "h-11", "flex", "items-center", "justify-center", "gap-2", "rounded-lg", "font-bold", "text-base", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 2, "background", "var(--primary)", "color", "#0F1111", 3, "disabled"], ["name", "circle-check-big", "strokeWidth", "2", 3, "size"], [1, "mt-3", "w-24", "h-24", "object-cover", "rounded-xl", "shadow-sm", 2, "border", "1.5px solid var(--border)", 3, "src"], [1, "field-error", "flex", "items-center", "gap-1"], ["name", "circle-alert", "strokeWidth", "2", 3, "size"]], template: function PostProductComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast", 0);
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275element(6, "lucide-angular", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div")(8, "h2", 7);
      \u0275\u0275text(9, "Add Product");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 8);
      \u0275\u0275text(11, "Fill in the details to list a new product");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(12, "div", 9)(13, "form", 10);
      \u0275\u0275listener("ngSubmit", function PostProductComponent_Template_form_ngSubmit_13_listener() {
        return ctx.addProduct();
      });
      \u0275\u0275elementStart(14, "div")(15, "label", 11);
      \u0275\u0275text(16, "Product Image");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "label", 12);
      \u0275\u0275element(18, "lucide-angular", 13);
      \u0275\u0275elementStart(19, "span");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "input", 14);
      \u0275\u0275listener("change", function PostProductComponent_Template_input_change_21_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(22, PostProductComponent_img_22_Template, 1, 1, "img", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 16)(24, "label");
      \u0275\u0275text(25, "Category ");
      \u0275\u0275elementStart(26, "span", 17);
      \u0275\u0275text(27, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(28, "p-dropdown", 18);
      \u0275\u0275template(29, PostProductComponent_p_29_Template, 3, 1, "p", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 20)(31, "div", 21)(32, "label");
      \u0275\u0275text(33, "Name ");
      \u0275\u0275elementStart(34, "span", 17);
      \u0275\u0275text(35, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(36, "input", 22);
      \u0275\u0275template(37, PostProductComponent_p_37_Template, 3, 1, "p", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div", 21)(39, "label");
      \u0275\u0275text(40, "Price ");
      \u0275\u0275elementStart(41, "span", 17);
      \u0275\u0275text(42, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(43, "input", 23);
      \u0275\u0275template(44, PostProductComponent_p_44_Template, 3, 1, "p", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 16)(46, "label");
      \u0275\u0275text(47, "Description ");
      \u0275\u0275elementStart(48, "span", 17);
      \u0275\u0275text(49, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(50, "textarea", 24);
      \u0275\u0275template(51, PostProductComponent_p_51_Template, 3, 1, "p", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275element(52, "div", 25);
      \u0275\u0275elementStart(53, "button", 26);
      \u0275\u0275element(54, "lucide-angular", 27);
      \u0275\u0275text(55, " Add Product ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      \u0275\u0275advance(6);
      \u0275\u0275property("size", 22);
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.productForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("size", 18);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.selectedFile ? ctx.selectedFile.name : "Click to upload image");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.imagePreview);
      \u0275\u0275advance(6);
      \u0275\u0275property("options", ctx.listofCategories);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.productForm.get("categoryId")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.productForm.get("categoryId")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.productForm.get("name")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.productForm.get("name")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.productForm.get("price")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.productForm.get("price")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_9_0 = ctx.productForm.get("description")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.productForm.get("description")) == null ? null : tmp_9_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.productForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275property("size", 18);
    }
  }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, InputText, Dropdown, Toast, InputTextarea, LucideAngularComponent], styles: ["\n\n/*# sourceMappingURL=post-product.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PostProductComponent, { className: "PostProductComponent" });
})();

// src/app/admin/components/post-coupon/post-coupon.component.ts
function PostCouponComponent_p_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275element(1, "lucide-angular", 23);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function PostCouponComponent_p_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275element(1, "lucide-angular", 23);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function PostCouponComponent_p_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275element(1, "lucide-angular", 23);
    \u0275\u0275text(2, " Enter 1\u2013100 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function PostCouponComponent_p_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275element(1, "lucide-angular", 23);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
var PostCouponComponent = class _PostCouponComponent {
  fb;
  router;
  messageService;
  adminService;
  couponForm;
  constructor(fb, router, messageService, adminService) {
    this.fb = fb;
    this.router = router;
    this.messageService = messageService;
    this.adminService = adminService;
  }
  ngOnInit() {
    this.couponForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      expirationDate: [null, [Validators.required]]
    });
  }
  addCoupon() {
    if (this.couponForm.valid) {
      const payload = __spreadProps(__spreadValues({}, this.couponForm.value), { discount: Number(this.couponForm.value.discount) });
      this.adminService.addCoupon(payload).subscribe((res) => {
        if (res.id != null) {
          this.messageService.add({ severity: "success", summary: "Success", detail: "Coupon Posted SuccessFully", life: 5e3 });
          this.router.navigateByUrl("/admin/dashboard");
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res.message, life: 5e3 });
        }
      });
    } else {
      this.couponForm.markAllAsTouched();
    }
  }
  static \u0275fac = function PostCouponComponent_Factory(t) {
    return new (t || _PostCouponComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MessageService), \u0275\u0275directiveInject(AdminService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PostCouponComponent, selectors: [["app-post-coupon"]], decls: 47, vars: 9, consts: [["position", "top-right"], [1, "min-h-screen", "flex", "items-start", "justify-center", "px-4", "py-10", 2, "background", "var(--bg-base)"], [1, "w-full", "max-w-md"], [1, "rounded-t-2xl", "px-7", "py-6", 2, "background", "#131921"], [1, "flex", "items-center", "gap-3"], [1, "rounded-xl", "p-2.5", 2, "background", "rgba(255,255,255,0.12)"], ["name", "tag", "strokeWidth", "1.5", 1, "text-white", 3, "size"], [1, "text-white", "text-xl", "font-bold", "tracking-tight"], [1, "text-sm", 2, "color", "rgba(255,255,255,0.55)"], [1, "rounded-b-2xl", "shadow-xl", "px-7", "py-8", 2, "background", "#fff", "border", "1.5px solid var(--border)", "border-top", "none"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], [1, "form-group"], [2, "color", "var(--danger)"], ["pInputText", "", "formControlName", "name", "placeholder", "e.g. Summer Sale"], ["class", "field-error flex items-center gap-1", 4, "ngIf"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["pInputText", "", "formControlName", "code", "placeholder", "e.g. SUM20OFF"], ["pInputText", "", "type", "number", "formControlName", "discount", "placeholder", "1\u2013100"], ["formControlName", "expirationDate", "dateFormat", "dd/mm/yy", "placeholder", "Select date", "appendTo", "body", 3, "showIcon"], [2, "border-top", "1px solid var(--border)", "padding-top", ".5rem"], ["type", "submit", "onmouseenter", "if(!this.disabled)this.style.background='var(--primary-h)'", "onmouseleave", "this.style.background='var(--primary)'", 1, "w-full", "h-11", "flex", "items-center", "justify-center", "gap-2", "rounded-lg", "font-bold", "text-base", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 2, "background", "var(--primary)", "color", "#0F1111", 3, "disabled"], ["name", "tag", "strokeWidth", "2", 3, "size"], [1, "field-error", "flex", "items-center", "gap-1"], ["name", "circle-alert", "strokeWidth", "2", 3, "size"]], template: function PostCouponComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast", 0);
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275element(6, "lucide-angular", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div")(8, "h2", 7);
      \u0275\u0275text(9, "Add Coupon");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 8);
      \u0275\u0275text(11, "Create a new discount coupon");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(12, "div", 9)(13, "form", 10);
      \u0275\u0275listener("ngSubmit", function PostCouponComponent_Template_form_ngSubmit_13_listener() {
        return ctx.addCoupon();
      });
      \u0275\u0275elementStart(14, "div", 11)(15, "label");
      \u0275\u0275text(16, "Coupon Name ");
      \u0275\u0275elementStart(17, "span", 12);
      \u0275\u0275text(18, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(19, "input", 13);
      \u0275\u0275template(20, PostCouponComponent_p_20_Template, 3, 1, "p", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 15)(22, "div", 11)(23, "label");
      \u0275\u0275text(24, "Code ");
      \u0275\u0275elementStart(25, "span", 12);
      \u0275\u0275text(26, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(27, "input", 16);
      \u0275\u0275template(28, PostCouponComponent_p_28_Template, 3, 1, "p", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 11)(30, "label");
      \u0275\u0275text(31, "Discount % ");
      \u0275\u0275elementStart(32, "span", 12);
      \u0275\u0275text(33, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(34, "input", 17);
      \u0275\u0275template(35, PostCouponComponent_p_35_Template, 3, 1, "p", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "div", 11)(37, "label");
      \u0275\u0275text(38, "Expiration Date ");
      \u0275\u0275elementStart(39, "span", 12);
      \u0275\u0275text(40, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(41, "p-calendar", 18);
      \u0275\u0275template(42, PostCouponComponent_p_42_Template, 3, 1, "p", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "div", 19);
      \u0275\u0275elementStart(44, "button", 20);
      \u0275\u0275element(45, "lucide-angular", 21);
      \u0275\u0275text(46, " Add Coupon ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_6_0;
      \u0275\u0275advance(6);
      \u0275\u0275property("size", 22);
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.couponForm);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.couponForm.get("name")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.couponForm.get("name")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.couponForm.get("code")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.couponForm.get("code")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.couponForm.get("discount")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.couponForm.get("discount")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275property("showIcon", true);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.couponForm.get("expirationDate")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.couponForm.get("expirationDate")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.couponForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275property("size", 18);
    }
  }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, InputText, Toast, Calendar, LucideAngularComponent], styles: ["\n\n/*# sourceMappingURL=post-coupon.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PostCouponComponent, { className: "PostCouponComponent" });
})();

// src/app/admin/components/coupons/coupons.component.ts
function CouponsComponent_p_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275element(1, "lucide-angular", 42);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function CouponsComponent_p_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275element(1, "lucide-angular", 42);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function CouponsComponent_p_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275element(1, "lucide-angular", 42);
    \u0275\u0275text(2, " Enter 1\u2013100 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function CouponsComponent_p_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275element(1, "lucide-angular", 42);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function CouponsComponent_option_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r1 = ctx.$implicit;
    \u0275\u0275property("value", m_r1.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r1.label);
  }
}
function CouponsComponent_option_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const y_r2 = ctx.$implicit;
    \u0275\u0275property("value", y_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(y_r2);
  }
}
function CouponsComponent_div_88_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 49);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "span", 50);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 51);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 52);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "div", 53)(19, "button", 54);
    \u0275\u0275listener("click", function CouponsComponent_div_88_tr_19_Template_button_click_19_listener() {
      const c_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.editCoupon(c_r4));
    });
    \u0275\u0275element(20, "lucide-angular", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 56);
    \u0275\u0275listener("click", function CouponsComponent_div_88_tr_19_Template_button_click_21_listener() {
      const c_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.deleteCoupon(c_r4));
    });
    \u0275\u0275element(22, "lucide-angular", 57);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    const i_r6 = ctx.index;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ct-expired-row", ctx_r4.isExpired(c_r4.expirationDate));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r4.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r4.code);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r4.discountColor(c_r4.discount));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", c_r4.discount, "% OFF");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 16, c_r4.expirationDate, "dd MMM yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275classProp("ct-badge-expired", ctx_r4.isExpired(c_r4.expirationDate))("ct-badge-active", !ctx_r4.isExpired(c_r4.expirationDate));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.isExpired(c_r4.expirationDate) ? "Expired" : "Active", " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("size", 14);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 14);
  }
}
function CouponsComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "table", 45)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Discount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Expires");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Action");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275template(19, CouponsComponent_div_88_tr_19_Template, 23, 19, "tr", 46);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r4.coupons);
  }
}
function CouponsComponent_div_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275element(1, "lucide-angular", 59);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No coupons found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("size", 44);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r4.filterMonth && ctx_r4.filterYear ? "No coupons found for the selected period." : "No active coupons expiring this month.");
  }
}
var CouponsComponent = class _CouponsComponent {
  fb;
  messageService;
  adminService;
  coupons = [];
  couponForm;
  editingCoupon = null;
  // Filter
  filterMonth = null;
  filterYear = null;
  months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 }
  ];
  years = [];
  constructor(fb, messageService, adminService) {
    this.fb = fb;
    this.messageService = messageService;
    this.adminService = adminService;
  }
  ngOnInit() {
    this.couponForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      expirationDate: [null, [Validators.required]]
    });
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    for (let y = currentYear - 2; y <= currentYear + 5; y++)
      this.years.push(y);
    this.getCoupons();
  }
  getCoupons() {
    const now = /* @__PURE__ */ new Date();
    this.adminService.getCouponsByMonthYear(now.getMonth() + 1, now.getFullYear()).subscribe((res) => {
      const all = Array.isArray(res) ? res : res ? [res] : [];
      this.coupons = all.filter((c) => !this.isExpired(c.expirationDate));
    });
  }
  submitForm() {
    if (this.editingCoupon) {
      this.updateCoupon();
    } else {
      this.addCoupon();
    }
  }
  addCoupon() {
    if (this.couponForm.valid) {
      const payload = __spreadProps(__spreadValues({}, this.couponForm.value), { discount: Number(this.couponForm.value.discount) });
      this.adminService.addCoupon(payload).subscribe((res) => {
        if (res.id != null) {
          this.messageService.add({ severity: "success", summary: "Success", detail: "Coupon added successfully", life: 4e3 });
          this.couponForm.reset();
          this.getCoupons();
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res.message, life: 4e3 });
        }
      });
    } else {
      this.couponForm.markAllAsTouched();
    }
  }
  editCoupon(coupon) {
    this.editingCoupon = coupon;
    this.couponForm.patchValue({
      name: coupon.name,
      code: coupon.code,
      discount: coupon.discount,
      expirationDate: new Date(coupon.expirationDate)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  cancelEdit() {
    this.editingCoupon = null;
    this.couponForm.reset();
  }
  updateCoupon() {
    if (this.couponForm.valid) {
      const payload = __spreadProps(__spreadValues({}, this.couponForm.value), { discount: Number(this.couponForm.value.discount) });
      this.adminService.updateCoupon(this.editingCoupon.id, payload).subscribe({
        next: () => {
          this.messageService.add({ severity: "success", summary: "Updated", detail: "Coupon updated successfully", life: 4e3 });
          this.editingCoupon = null;
          this.couponForm.reset();
          this.getCoupons();
        },
        error: () => this.messageService.add({ severity: "error", summary: "Error", detail: "Failed to update coupon", life: 4e3 })
      });
    } else {
      this.couponForm.markAllAsTouched();
    }
  }
  deleteCoupon(coupon) {
    this.adminService.deleteCoupon(coupon.id).subscribe({
      next: () => {
        this.messageService.add({ severity: "success", summary: "Deleted", detail: "Coupon deleted successfully", life: 4e3 });
        if (this.editingCoupon?.id === coupon.id)
          this.cancelEdit();
        this.getCoupons();
      },
      error: () => this.messageService.add({ severity: "error", summary: "Error", detail: "Failed to delete coupon", life: 4e3 })
    });
  }
  filterCoupons() {
    if (this.filterMonth && this.filterYear) {
      this.adminService.getCouponsByMonthYear(this.filterMonth, this.filterYear).subscribe((res) => {
        this.coupons = Array.isArray(res) ? res : res ? [res] : [];
      });
    }
  }
  clearFilter() {
    this.filterMonth = null;
    this.filterYear = null;
    this.getCoupons();
  }
  discountColor(discount) {
    if (discount >= 30)
      return "var(--success)";
    if (discount >= 15)
      return "var(--warning)";
    return "var(--accent)";
  }
  isExpired(date) {
    return new Date(date) < /* @__PURE__ */ new Date();
  }
  static \u0275fac = function CouponsComponent_Factory(t) {
    return new (t || _CouponsComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MessageService), \u0275\u0275directiveInject(AdminService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CouponsComponent, selectors: [["app-coupons"]], decls: 90, vars: 32, consts: [["position", "top-right"], [1, "page-wrap"], [1, "mb-6"], [1, "section-title", "mb-1"], [1, "text-sm", 2, "color", "var(--text-muted)"], [1, "coupon-split"], [1, "coupon-form-card"], [1, "form-header"], [1, "icon-wrap"], ["strokeWidth", "1.5", 3, "name", "size"], [1, "form-body"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "form-group"], [2, "color", "var(--danger)"], ["pInputText", "", "formControlName", "name", "placeholder", "e.g. Summer Sale"], ["class", "field-error flex items-center gap-1", 4, "ngIf"], [1, "form-row-2"], ["pInputText", "", "formControlName", "code", "placeholder", "e.g. SUM20OFF", 2, "font-family", "var(--font-mono)", "letter-spacing", ".05em", "text-transform", "uppercase"], ["pInputText", "", "type", "number", "formControlName", "discount", "placeholder", "Enter 1 \u2013 100", "min", "1", "max", "100"], ["formControlName", "expirationDate", "dateFormat", "dd/mm/yy", "placeholder", "Select date", "appendTo", "body", 3, "showIcon"], [2, "border-top", "1px solid var(--border)", "padding-top", ".75rem", "display", "flex", "gap", ".75rem"], ["type", "submit", "onmouseenter", "if(!this.disabled)this.style.background='var(--primary-h)'", "onmouseleave", "this.style.background='var(--primary)'", 1, "flex-1", "h-11", "flex", "items-center", "justify-center", "gap-2", "rounded-lg", "font-bold", "text-sm", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 2, "background", "var(--primary)", "color", "#0F1111", 3, "disabled"], ["strokeWidth", "2.5", 3, "name", "size"], ["type", "button", 1, "h-11", "px-4", "flex", "items-center", "gap-2", "rounded-lg", "font-bold", "text-sm", "border", "transition-colors", 2, "border-color", "var(--border)", "color", "var(--text-muted)", "background", "transparent", 3, "click"], [1, "coupon-panel"], [1, "coupon-panel-header"], ["name", "ticket", "strokeWidth", "1.5", 3, "size"], [1, "coupon-panel-body"], [1, "coupon-filter-bar"], [1, "coupon-filter-fields"], [1, "form-group", 2, "margin", "0"], [1, "coupon-select", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], [1, "coupon-filter-actions"], [1, "cf-btn", "cf-btn-primary", 3, "click", "disabled"], ["name", "search", "strokeWidth", "2", 3, "size"], [1, "cf-btn", "cf-btn-ghost", 3, "click"], ["name", "refresh-cw", "strokeWidth", "2", 3, "size"], ["class", "coupon-table-wrap", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "field-error", "flex", "items-center", "gap-1"], ["name", "circle-alert", "strokeWidth", "2", 3, "size"], [3, "value"], [1, "coupon-table-wrap"], [1, "coupon-table"], [3, "ct-expired-row", 4, "ngFor", "ngForOf"], [1, "ct-index"], [1, "ct-name"], [1, "ct-code"], [1, "ct-discount"], [1, "ct-date"], [1, "ct-badge"], [2, "display", "flex", "gap", ".4rem"], ["title", "Edit coupon", 1, "ct-edit-btn", 3, "click"], ["name", "pencil", "strokeWidth", "2", 3, "size"], ["title", "Delete coupon", 1, "ct-delete-btn", 3, "click"], ["name", "trash-2", "strokeWidth", "2", 3, "size"], [1, "empty-state"], ["name", "ticket", "strokeWidth", "1", 2, "color", "var(--text-dim)", 3, "size"]], template: function CouponsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast", 0);
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Coupons");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Create, manage and filter discount coupons");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "div", 7)(10, "div", 8);
      \u0275\u0275element(11, "lucide-angular", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div")(13, "h3");
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "p");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 10)(18, "form", 11);
      \u0275\u0275listener("ngSubmit", function CouponsComponent_Template_form_ngSubmit_18_listener() {
        return ctx.submitForm();
      });
      \u0275\u0275elementStart(19, "div", 12)(20, "label");
      \u0275\u0275text(21, "Coupon Name ");
      \u0275\u0275elementStart(22, "span", 13);
      \u0275\u0275text(23, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(24, "input", 14);
      \u0275\u0275template(25, CouponsComponent_p_25_Template, 3, 1, "p", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 16)(27, "div", 12)(28, "label");
      \u0275\u0275text(29, "Coupon Code ");
      \u0275\u0275elementStart(30, "span", 13);
      \u0275\u0275text(31, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(32, "input", 17);
      \u0275\u0275template(33, CouponsComponent_p_33_Template, 3, 1, "p", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 12)(35, "label");
      \u0275\u0275text(36, "Discount % ");
      \u0275\u0275elementStart(37, "span", 13);
      \u0275\u0275text(38, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(39, "input", 18);
      \u0275\u0275template(40, CouponsComponent_p_40_Template, 3, 1, "p", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "div", 12)(42, "label");
      \u0275\u0275text(43, "Expiration Date ");
      \u0275\u0275elementStart(44, "span", 13);
      \u0275\u0275text(45, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(46, "p-calendar", 19);
      \u0275\u0275template(47, CouponsComponent_p_47_Template, 3, 1, "p", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 20)(49, "button", 21);
      \u0275\u0275element(50, "lucide-angular", 22);
      \u0275\u0275text(51);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "button", 23);
      \u0275\u0275listener("click", function CouponsComponent_Template_button_click_52_listener() {
        return ctx.cancelEdit();
      });
      \u0275\u0275element(53, "lucide-angular", 22);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(55, "div", 24)(56, "div", 25)(57, "div", 8);
      \u0275\u0275element(58, "lucide-angular", 26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "div")(60, "h3");
      \u0275\u0275text(61);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "p");
      \u0275\u0275text(63);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(64, "div", 27)(65, "div", 28)(66, "div", 29)(67, "div", 30)(68, "label");
      \u0275\u0275text(69, "Month");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "select", 31);
      \u0275\u0275twoWayListener("ngModelChange", function CouponsComponent_Template_select_ngModelChange_70_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filterMonth, $event) || (ctx.filterMonth = $event);
        return $event;
      });
      \u0275\u0275elementStart(71, "option", 32);
      \u0275\u0275text(72, "All months");
      \u0275\u0275elementEnd();
      \u0275\u0275template(73, CouponsComponent_option_73_Template, 2, 2, "option", 33);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(74, "div", 30)(75, "label");
      \u0275\u0275text(76, "Year");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "select", 31);
      \u0275\u0275twoWayListener("ngModelChange", function CouponsComponent_Template_select_ngModelChange_77_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filterYear, $event) || (ctx.filterYear = $event);
        return $event;
      });
      \u0275\u0275elementStart(78, "option", 32);
      \u0275\u0275text(79, "All years");
      \u0275\u0275elementEnd();
      \u0275\u0275template(80, CouponsComponent_option_80_Template, 2, 2, "option", 33);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(81, "div", 34)(82, "button", 35);
      \u0275\u0275listener("click", function CouponsComponent_Template_button_click_82_listener() {
        return ctx.filterCoupons();
      });
      \u0275\u0275element(83, "lucide-angular", 36);
      \u0275\u0275text(84, " Search ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "button", 37);
      \u0275\u0275listener("click", function CouponsComponent_Template_button_click_85_listener() {
        return ctx.clearFilter();
      });
      \u0275\u0275element(86, "lucide-angular", 38);
      \u0275\u0275text(87, " Reset ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(88, CouponsComponent_div_88_Template, 20, 1, "div", 39)(89, CouponsComponent_div_89_Template, 6, 2, "div", 40);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_9_0;
      \u0275\u0275advance(11);
      \u0275\u0275property("name", ctx.editingCoupon ? "pencil" : "tag")("size", 20);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.editingCoupon ? "Edit Coupon" : "Add Coupon");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.editingCoupon ? "Update coupon details below" : "Create a new discount coupon");
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.couponForm);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.couponForm.get("name")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.couponForm.get("name")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.couponForm.get("code")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.couponForm.get("code")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.couponForm.get("discount")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.couponForm.get("discount")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275property("showIcon", true);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_9_0 = ctx.couponForm.get("expirationDate")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.couponForm.get("expirationDate")) == null ? null : tmp_9_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.couponForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275property("name", ctx.editingCoupon ? "save" : "plus")("size", 16);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.editingCoupon ? "Update Coupon" : "Add Coupon", " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("name", ctx.editingCoupon ? "x" : "refresh-cw")("size", 16);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.editingCoupon ? "Cancel" : "Reset", " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("size", 20);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.filterMonth && ctx.filterYear ? "Filtered Coupons" : "Active This Month");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2("", (ctx.coupons == null ? null : ctx.coupons.length) || 0, " coupon", (ctx.coupons == null ? null : ctx.coupons.length) !== 1 ? "s" : "", " found");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.filterMonth);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.months);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filterYear);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.years);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.filterMonth || !ctx.filterYear);
      \u0275\u0275advance();
      \u0275\u0275property("size", 14);
      \u0275\u0275advance(3);
      \u0275\u0275property("size", 14);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.coupons && ctx.coupons.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.coupons || ctx.coupons.length === 0);
    }
  }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, NgModel, FormGroupDirective, FormControlName, InputText, Toast, Calendar, LucideAngularComponent, DatePipe], styles: ["/* src/app/admin/components/coupons/coupons.component.scss */\n.coupon-split {\n  display: grid;\n  grid-template-columns: 380px 1fr;\n  gap: 1.75rem;\n  align-items: start;\n}\n@media (max-width: 900px) {\n  .coupon-split {\n    grid-template-columns: 1fr;\n  }\n}\n.coupon-panel .coupon-panel-header,\n.coupon-form-card .form-header {\n  display: flex;\n  align-items: center;\n  gap: 0.875rem;\n  padding: 1.25rem 1.5rem;\n  background: #131921;\n}\n.coupon-panel .coupon-panel-header .icon-wrap,\n.coupon-form-card .form-header .icon-wrap {\n  width: 38px;\n  height: 38px;\n  border-radius: 9px;\n  background: rgba(255, 255, 255, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  flex-shrink: 0;\n}\n.coupon-panel .coupon-panel-header h3,\n.coupon-form-card .form-header h3 {\n  color: #fff;\n  font-size: 1rem;\n  font-weight: 700;\n  margin: 0;\n}\n.coupon-panel .coupon-panel-header p,\n.coupon-form-card .form-header p {\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 0.78rem;\n  margin: 0;\n}\n.coupon-form-card {\n  border-radius: 14px;\n  overflow: hidden;\n  border: 1.5px solid var(--border);\n  box-shadow: var(--shadow);\n  position: sticky;\n  top: 76px;\n}\n.coupon-form-card .form-body {\n  padding: 1.5rem;\n  background: var(--bg-card);\n}\n.coupon-panel {\n  border-radius: 14px;\n  overflow: hidden;\n  border: 1.5px solid var(--border);\n  box-shadow: var(--shadow);\n}\n.coupon-panel .coupon-panel-body {\n  padding: 1.5rem;\n  background: var(--bg-card);\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.coupon-filter-bar {\n  display: flex;\n  align-items: flex-end;\n  gap: 1rem;\n  flex-wrap: wrap;\n  padding: 1rem 1.25rem;\n  background: var(--bg-elevated);\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n}\n.coupon-filter-fields {\n  display: flex;\n  gap: 0.75rem;\n  flex: 1;\n  flex-wrap: wrap;\n}\n.coupon-select {\n  height: 38px;\n  border: 1.5px solid var(--border);\n  border-radius: 8px;\n  background: var(--bg-card);\n  color: var(--text);\n  font-size: 0.85rem;\n  padding: 0 0.75rem;\n  min-width: 140px;\n  outline: none;\n  cursor: pointer;\n}\n.coupon-select:focus {\n  border-color: var(--primary);\n}\n.coupon-filter-actions {\n  display: flex;\n  gap: 0.5rem;\n}\n.cf-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  height: 38px;\n  padding: 0 1rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 700;\n  border: none;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.cf-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.cf-btn.cf-btn-primary {\n  background: var(--primary);\n  color: #0F1111;\n}\n.cf-btn.cf-btn-primary:hover:not(:disabled) {\n  background: var(--primary-h);\n}\n.cf-btn.cf-btn-ghost {\n  background: var(--bg-card);\n  color: var(--text-muted);\n  border: 1.5px solid var(--border);\n}\n.cf-btn.cf-btn-ghost:hover {\n  background: var(--bg-elevated);\n  color: var(--text);\n}\n.coupon-table-wrap {\n  overflow-x: auto;\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n}\n.coupon-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.85rem;\n}\n.coupon-table thead tr {\n  background: var(--bg-elevated);\n  border-bottom: 1.5px solid var(--border);\n}\n.coupon-table th {\n  padding: 0.75rem 1rem;\n  text-align: left;\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: var(--text-muted);\n  white-space: nowrap;\n}\n.coupon-table tbody tr {\n  border-bottom: 1px solid var(--border);\n  transition: background 0.12s;\n}\n.coupon-table tbody tr:last-child {\n  border-bottom: none;\n}\n.coupon-table tbody tr:hover {\n  background: var(--bg-elevated);\n}\n.coupon-table tbody tr.ct-expired-row {\n  opacity: 0.7;\n}\n.coupon-table td {\n  padding: 0.75rem 1rem;\n  color: var(--text);\n  vertical-align: middle;\n}\n.ct-index {\n  color: var(--text-muted);\n  font-size: 0.78rem;\n  width: 40px;\n}\n.ct-name {\n  font-weight: 600;\n}\n.ct-date {\n  color: var(--text-muted);\n  white-space: nowrap;\n}\n.ct-code {\n  font-family: var(--font-mono);\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #007185;\n  background: rgba(0, 113, 133, 0.08);\n  border: 1px solid rgba(0, 113, 133, 0.18);\n  padding: 0.2rem 0.55rem;\n  border-radius: 5px;\n}\n.ct-discount {\n  font-weight: 700;\n  font-size: 0.85rem;\n}\n.ct-badge {\n  display: inline-block;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  padding: 0.2rem 0.55rem;\n  border-radius: 4px;\n}\n.ct-badge.ct-badge-active {\n  background: rgba(0, 180, 100, 0.12);\n  color: var(--success);\n}\n.ct-badge.ct-badge-expired {\n  background: rgba(220, 50, 50, 0.12);\n  color: var(--danger);\n}\n.ct-edit-btn,\n.ct-delete-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border-radius: 7px;\n  border: 1.5px solid var(--border);\n  background: transparent;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    color 0.12s,\n    border-color 0.12s;\n}\n.ct-edit-btn:hover {\n  background: var(--primary);\n  color: #0F1111;\n  border-color: var(--primary);\n}\n.ct-delete-btn:hover {\n  background: var(--danger);\n  color: #fff;\n  border-color: var(--danger);\n}\n.empty-state {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: var(--text-muted);\n}\n.empty-state h3 {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--text);\n  margin: 0.75rem 0 0.4rem;\n}\n.empty-state p {\n  font-size: 0.85rem;\n  margin: 0;\n}\n/*# sourceMappingURL=coupons.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CouponsComponent, { className: "CouponsComponent" });
})();

// src/app/admin/components/orders/orders.component.ts
function OrdersComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th");
    \u0275\u0275text(2, "Tracking ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "th");
    \u0275\u0275text(4, "Customer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Action");
    \u0275\u0275elementEnd()();
  }
}
function OrdersComponent_ng_template_6_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function OrdersComponent_ng_template_6_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const order_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeOrderStatus(order_r2.id, "Shipped"));
    });
    \u0275\u0275element(1, "lucide-angular", 15);
    \u0275\u0275text(2, " Ship ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function OrdersComponent_ng_template_6_button_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function OrdersComponent_ng_template_6_button_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const order_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeOrderStatus(order_r2.id, "Delivered"));
    });
    \u0275\u0275element(1, "lucide-angular", 17);
    \u0275\u0275text(2, " Deliver ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function OrdersComponent_ng_template_6_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275element(1, "lucide-angular", 17);
    \u0275\u0275text(2, " Fulfilled ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function OrdersComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "code", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 9);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275element(17, "p-tag", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275template(19, OrdersComponent_ng_template_6_button_19_Template, 3, 1, "button", 11)(20, OrdersComponent_ng_template_6_button_20_Template, 3, 1, "button", 12)(21, OrdersComponent_ng_template_6_span_21_Template, 3, 1, "span", 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(order_r2.trackingId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r2.userName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", order_r2.amount, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r2.orderDescription);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r2.address);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 11, order_r2.date, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", order_r2.orderStatus)("severity", order_r2.orderStatus === "DELIVERED" ? "success" : order_r2.orderStatus === "SHIPPED" ? "warning" : "info");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", order_r2.orderStatus === "PLACED");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", order_r2.orderStatus === "SHIPPED");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", order_r2.orderStatus === "DELIVERED");
  }
}
function OrdersComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 19)(2, "div", 20);
    \u0275\u0275element(3, "lucide-angular", 21);
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "No orders found");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275property("size", 48);
  }
}
var OrdersComponent = class _OrdersComponent {
  adminService;
  messageService;
  orders;
  displayedColumns = ["trackingId", "userName", "amount", "description", "address", "date", "status", "action"];
  constructor(adminService, messageService) {
    this.adminService = adminService;
    this.messageService = messageService;
  }
  ngOnInit() {
    this.getPlacedOrders();
  }
  getPlacedOrders() {
    this.adminService.getPlacedOrders().subscribe((res) => {
      this.orders = res;
    });
  }
  changeOrderStatus(orderId, status) {
    this.adminService.changeOrderStatus(orderId, status).subscribe((res) => {
      if (res.id != null) {
        this.messageService.add({ severity: "success", summary: "Success", detail: "Order status changed successfully", life: 5e3 });
        this.getPlacedOrders();
      } else {
        this.messageService.add({ severity: "success", summary: "Success", detail: "Something went wrong", life: 5e3 });
      }
    });
  }
  static \u0275fac = function OrdersComponent_Factory(t) {
    return new (t || _OrdersComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(MessageService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrdersComponent, selectors: [["app-orders"]], decls: 8, vars: 3, consts: [["position", "top-right"], [1, "page-wrap"], [1, "section-title"], ["styleClass", "p-datatable-sm", "responsiveLayout", "scroll", 3, "value", "paginator", "rows"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], [2, "font-size", ".75rem", "color", "var(--text-muted)"], [2, "font-family", "var(--font-mono)"], [2, "max-width", "160px", "white-space", "nowrap", "overflow", "hidden", "text-overflow", "ellipsis"], [3, "value", "severity"], ["class", "ord-btn ord-ship", "pTooltip", "Mark as Shipped", "tooltipPosition", "left", 3, "click", 4, "ngIf"], ["class", "ord-btn ord-deliver", "pTooltip", "Mark as Delivered", "tooltipPosition", "left", 3, "click", 4, "ngIf"], ["class", "ord-fulfilled", 4, "ngIf"], ["pTooltip", "Mark as Shipped", "tooltipPosition", "left", 1, "ord-btn", "ord-ship", 3, "click"], ["name", "truck", "strokeWidth", "2.5", 3, "size"], ["pTooltip", "Mark as Delivered", "tooltipPosition", "left", 1, "ord-btn", "ord-deliver", 3, "click"], ["name", "circle-check", "strokeWidth", "2.5", 3, "size"], [1, "ord-fulfilled"], ["colspan", "8"], [1, "empty-state"], ["name", "package", "strokeWidth", "1", 2, "color", "var(--text-dim)", 3, "size"]], template: function OrdersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast", 0);
      \u0275\u0275elementStart(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Manage Orders");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p-table", 3);
      \u0275\u0275template(5, OrdersComponent_ng_template_5_Template, 17, 0, "ng-template", 4)(6, OrdersComponent_ng_template_6_Template, 22, 14, "ng-template", 5)(7, OrdersComponent_ng_template_7_Template, 6, 1, "ng-template", 6);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.orders)("paginator", true)("rows", 10);
    }
  }, dependencies: [NgIf, PrimeTemplate, Table, Toast, Tag, Tooltip, LucideAngularComponent, DatePipe], styles: ["/* src/app/admin/components/orders/orders.component.scss */\n.ord-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.32rem 0.85rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  border: none;\n  cursor: pointer;\n  transition:\n    filter 0.15s,\n    transform 0.1s,\n    box-shadow 0.15s;\n  white-space: nowrap;\n}\n.ord-btn:hover {\n  filter: brightness(1.1);\n  transform: translateY(-1px);\n}\n.ord-btn:active {\n  transform: translateY(0);\n  filter: brightness(0.95);\n}\n.ord-ship {\n  background: #007185;\n  color: #fff;\n  box-shadow: 0 2px 8px rgba(0, 113, 133, 0.35);\n}\n.ord-ship:hover {\n  box-shadow: 0 4px 14px rgba(0, 113, 133, 0.45);\n}\n.ord-deliver {\n  background: #067D62;\n  color: #fff;\n  box-shadow: 0 2px 8px rgba(6, 125, 98, 0.35);\n}\n.ord-deliver:hover {\n  box-shadow: 0 4px 14px rgba(6, 125, 98, 0.45);\n}\n.ord-fulfilled {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #067D62;\n  opacity: 0.7;\n}\n/*# sourceMappingURL=orders.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrdersComponent, { className: "OrdersComponent" });
})();

// src/app/admin/components/post-product-faq/post-product-faq.component.ts
function PostProductFaqComponent_p_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275element(1, "lucide-angular", 20);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
function PostProductFaqComponent_p_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275element(1, "lucide-angular", 20);
    \u0275\u0275text(2, " Required ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 13);
  }
}
var PostProductFaqComponent = class _PostProductFaqComponent {
  fb;
  router;
  messageService;
  adminService;
  activatedRoute;
  productId;
  FAQForm;
  constructor(fb, router, messageService, adminService, activatedRoute) {
    this.fb = fb;
    this.router = router;
    this.messageService = messageService;
    this.adminService = adminService;
    this.activatedRoute = activatedRoute;
  }
  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params["productId"];
    this.FAQForm = this.fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]]
    });
  }
  postFAQ() {
    console.log(JSON.stringify("Product ID :" + this.productId));
    console.log("FAQ FORM :" + this.FAQForm.value);
    this.adminService.postFAQ(this.productId, this.FAQForm.value).subscribe((res) => {
      if (res.id != null) {
        this.messageService.add({ severity: "success", summary: "Success", detail: "FAQ Posted SuccessFully", life: 5e3 });
        this.router.navigateByUrl("/admin/dashboard");
      } else {
        this.messageService.add({ severity: "success", summary: "Success", detail: "Something went wrong", life: 5e3 });
      }
    });
  }
  static \u0275fac = function PostProductFaqComponent_Factory(t) {
    return new (t || _PostProductFaqComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MessageService), \u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PostProductFaqComponent, selectors: [["app-post-product-faq"]], decls: 32, vars: 6, consts: [["position", "top-right"], [1, "min-h-screen", "flex", "items-start", "justify-center", "px-4", "py-10", 2, "background", "var(--bg-base)"], [1, "w-full", "max-w-lg"], [1, "rounded-t-2xl", "px-7", "py-6", 2, "background", "#131921"], [1, "flex", "items-center", "gap-3"], [1, "rounded-xl", "p-2.5", 2, "background", "rgba(255,255,255,0.12)"], ["name", "message-circle-question-mark", "strokeWidth", "1.5", 1, "text-white", 3, "size"], [1, "text-white", "text-xl", "font-bold", "tracking-tight"], [1, "text-sm", 2, "color", "rgba(255,255,255,0.55)"], [1, "rounded-b-2xl", "shadow-xl", "px-7", "py-8", 2, "background", "#fff", "border", "1.5px solid var(--border)", "border-top", "none"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], [1, "form-group"], [2, "color", "var(--danger)"], ["pInputTextarea", "", "formControlName", "question", "placeholder", "What would customers ask about this product?", "rows", "3"], ["class", "field-error flex items-center gap-1", 4, "ngIf"], ["pInputTextarea", "", "formControlName", "answer", "placeholder", "Provide a clear and helpful answer\u2026", "rows", "4"], [2, "border-top", "1px solid var(--border)", "padding-top", ".5rem"], ["type", "submit", "onmouseenter", "if(!this.disabled)this.style.background='var(--primary-h)'", "onmouseleave", "this.style.background='var(--primary)'", 1, "w-full", "h-11", "flex", "items-center", "justify-center", "gap-2", "rounded-lg", "font-bold", "text-base", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 2, "background", "var(--primary)", "color", "#0F1111", 3, "disabled"], ["name", "circle-check-big", "strokeWidth", "2", 3, "size"], [1, "field-error", "flex", "items-center", "gap-1"], ["name", "circle-alert", "strokeWidth", "2", 3, "size"]], template: function PostProductFaqComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast", 0);
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275element(6, "lucide-angular", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div")(8, "h2", 7);
      \u0275\u0275text(9, "Add FAQ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 8);
      \u0275\u0275text(11, "Add a question & answer for this product");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(12, "div", 9)(13, "form", 10);
      \u0275\u0275listener("ngSubmit", function PostProductFaqComponent_Template_form_ngSubmit_13_listener() {
        return ctx.postFAQ();
      });
      \u0275\u0275elementStart(14, "div", 11)(15, "label");
      \u0275\u0275text(16, "Question ");
      \u0275\u0275elementStart(17, "span", 12);
      \u0275\u0275text(18, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(19, "textarea", 13);
      \u0275\u0275template(20, PostProductFaqComponent_p_20_Template, 3, 1, "p", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 11)(22, "label");
      \u0275\u0275text(23, "Answer ");
      \u0275\u0275elementStart(24, "span", 12);
      \u0275\u0275text(25, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(26, "textarea", 15);
      \u0275\u0275template(27, PostProductFaqComponent_p_27_Template, 3, 1, "p", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275element(28, "div", 16);
      \u0275\u0275elementStart(29, "button", 17);
      \u0275\u0275element(30, "lucide-angular", 18);
      \u0275\u0275text(31, " Post FAQ ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      \u0275\u0275advance(6);
      \u0275\u0275property("size", 22);
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.FAQForm);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.FAQForm.get("question")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.FAQForm.get("question")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.FAQForm.get("answer")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.FAQForm.get("answer")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.FAQForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275property("size", 18);
    }
  }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, Toast, InputTextarea, LucideAngularComponent], styles: ["\n\n/*# sourceMappingURL=post-product-faq.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PostProductFaqComponent, { className: "PostProductFaqComponent" });
})();

// src/app/admin/components/update-product/update-product.component.ts
function UpdateProductComponent_img_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 26);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.imagePreview || ctx_r0.existingImage, \u0275\u0275sanitizeUrl);
  }
}
var UpdateProductComponent = class _UpdateProductComponent {
  fb;
  router;
  messageService;
  adminService;
  activatedRoute;
  productForm;
  listofCategories = [];
  selectedFile;
  imagePreview;
  productId;
  existingImage = null;
  imgChanged = false;
  constructor(fb, router, messageService, adminService, activatedRoute) {
    this.fb = fb;
    this.router = router;
    this.messageService = messageService;
    this.adminService = adminService;
    this.activatedRoute = activatedRoute;
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params["productId"];
    this.productForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required]
    });
    this.getAllCategories();
    this.getProductById();
  }
  getAllCategories() {
    this.adminService.getAllCategories().subscribe((res) => {
      this.listofCategories = res;
    });
  }
  getProductById() {
    this.adminService.getProductById(this.productId).subscribe((res) => {
      this.productForm.patchValue(res);
      this.existingImage = "data:image/jpeg;base64," + res.byteImg;
    });
  }
  updateProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();
      if (this.imgChanged && this.selectedFile) {
        formData.append("img", this.selectedFile);
      }
      formData.append("categoryId", this.productForm.get("categoryId").value);
      formData.append("name", this.productForm.get("name").value);
      formData.append("description", this.productForm.get("description").value);
      formData.append("price", this.productForm.get("price").value);
      this.adminService.updateProduct(this.productId, formData).subscribe((res) => {
        if (res != null) {
          console.log("Enter in IF", res);
          this.existingImage = res.byteImg ? "data:image/jpeg;base64," + res.byteImg : this.existingImage;
          this.messageService.add({ severity: "success", summary: "Success", detail: "Product Updated SuccessFully", life: 5e3 });
          this.router.navigateByUrl("/admin/dashboard");
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res?.message || "Failed to update product", life: 5e3 });
        }
      });
    } else {
      for (const i in this.productForm.controls) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
  static \u0275fac = function UpdateProductComponent_Factory(t) {
    return new (t || _UpdateProductComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MessageService), \u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UpdateProductComponent, selectors: [["app-update-product"]], decls: 52, vars: 8, consts: [["position", "top-right"], [1, "min-h-screen", "flex", "items-start", "justify-center", "px-4", "py-10", 2, "background", "var(--bg-base)"], [1, "w-full", "max-w-lg"], [1, "rounded-t-2xl", "px-7", "py-6", 2, "background", "#131921"], [1, "flex", "items-center", "gap-3"], [1, "rounded-xl", "p-2.5", 2, "background", "rgba(255,255,255,0.12)"], ["name", "pencil", "strokeWidth", "1.5", 1, "text-white", 3, "size"], [1, "text-white", "text-xl", "font-bold", "tracking-tight"], [1, "text-sm", 2, "color", "rgba(255,255,255,0.55)"], [1, "rounded-b-2xl", "shadow-xl", "px-7", "py-8", 2, "background", "#fff", "border", "1.5px solid var(--border)", "border-top", "none"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], [1, "block", "text-xs", "font-bold", "uppercase", "tracking-widest", "mb-2", 2, "color", "var(--text-muted)"], ["onmouseenter", "this.style.borderColor='var(--primary)';this.style.background='rgba(255,153,0,0.04)';this.style.color='var(--primary-dark)'", "onmouseleave", "this.style.borderColor='var(--border)';this.style.background='';this.style.color='var(--text-muted)'", 1, "flex", "items-center", "gap-3", "border-2", "border-dashed", "rounded-xl", "px-4", "py-4", "cursor-pointer", "text-sm", "transition-all", 2, "border-color", "var(--border)", "color", "var(--text-muted)"], ["name", "camera", "strokeWidth", "1.5", 2, "color", "var(--primary)", "flex-shrink", "0", 3, "size"], ["type", "file", "hidden", "", 3, "change"], ["class", "mt-3 w-24 h-24 object-cover rounded-xl shadow-sm", "style", "border:1.5px solid var(--border)", 3, "src", 4, "ngIf"], [1, "form-group"], [2, "color", "var(--danger)"], ["formControlName", "categoryId", "optionLabel", "name", "optionValue", "id", "placeholder", "Select a category", 3, "options"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["pInputText", "", "formControlName", "name", "placeholder", "Product name"], ["pInputText", "", "type", "number", "formControlName", "price", "placeholder", "0.00"], ["pInputTextarea", "", "formControlName", "description", "placeholder", "Describe the product\u2026", "rows", "4"], [2, "border-top", "1px solid var(--border)", "padding-top", ".5rem"], ["type", "submit", "onmouseenter", "if(!this.disabled)this.style.background='var(--primary-h)'", "onmouseleave", "this.style.background='var(--primary)'", 1, "w-full", "h-11", "flex", "items-center", "justify-center", "gap-2", "rounded-lg", "font-bold", "text-base", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 2, "background", "var(--primary)", "color", "#0F1111", 3, "disabled"], ["name", "circle-check-big", "strokeWidth", "2", 3, "size"], [1, "mt-3", "w-24", "h-24", "object-cover", "rounded-xl", "shadow-sm", 2, "border", "1.5px solid var(--border)", 3, "src"]], template: function UpdateProductComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast", 0);
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275element(6, "lucide-angular", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div")(8, "h2", 7);
      \u0275\u0275text(9, "Update Product");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 8);
      \u0275\u0275text(11, "Edit the details for this product");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(12, "div", 9)(13, "form", 10);
      \u0275\u0275listener("ngSubmit", function UpdateProductComponent_Template_form_ngSubmit_13_listener() {
        return ctx.updateProduct();
      });
      \u0275\u0275elementStart(14, "div")(15, "label", 11);
      \u0275\u0275text(16, "Product Image");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "label", 12);
      \u0275\u0275element(18, "lucide-angular", 13);
      \u0275\u0275elementStart(19, "span");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "input", 14);
      \u0275\u0275listener("change", function UpdateProductComponent_Template_input_change_21_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(22, UpdateProductComponent_img_22_Template, 1, 1, "img", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 16)(24, "label");
      \u0275\u0275text(25, "Category ");
      \u0275\u0275elementStart(26, "span", 17);
      \u0275\u0275text(27, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(28, "p-dropdown", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 19)(30, "div", 16)(31, "label");
      \u0275\u0275text(32, "Name ");
      \u0275\u0275elementStart(33, "span", 17);
      \u0275\u0275text(34, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(35, "input", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 16)(37, "label");
      \u0275\u0275text(38, "Price ");
      \u0275\u0275elementStart(39, "span", 17);
      \u0275\u0275text(40, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(41, "input", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "div", 16)(43, "label");
      \u0275\u0275text(44, "Description ");
      \u0275\u0275elementStart(45, "span", 17);
      \u0275\u0275text(46, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(47, "textarea", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275element(48, "div", 23);
      \u0275\u0275elementStart(49, "button", 24);
      \u0275\u0275element(50, "lucide-angular", 25);
      \u0275\u0275text(51, " Update Product ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("size", 22);
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.productForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("size", 18);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.selectedFile ? ctx.selectedFile.name : "Click to change image");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.imagePreview || ctx.existingImage);
      \u0275\u0275advance(6);
      \u0275\u0275property("options", ctx.listofCategories);
      \u0275\u0275advance(21);
      \u0275\u0275property("disabled", ctx.productForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275property("size", 18);
    }
  }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, InputText, Dropdown, Toast, InputTextarea, LucideAngularComponent], styles: ["\n\n/*# sourceMappingURL=update-product.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UpdateProductComponent, { className: "UpdateProductComponent" });
})();

// src/app/admin/components/analytics/order-by-status/order-by-status.component.ts
var OrderByStatusComponent = class _OrderByStatusComponent {
  data;
  static \u0275fac = function OrderByStatusComponent_Factory(t) {
    return new (t || _OrderByStatusComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderByStatusComponent, selectors: [["app-order-by-status"]], inputs: { data: "data" }, decls: 19, vars: 6, consts: [[1, "status-grid"], [1, "status-card", "status-placed"], ["name", "shopping-cart", "strokeWidth", "1.5", 1, "status-icon", 3, "size"], [1, "status-value"], [1, "status-label"], [1, "status-card", "status-shipped"], ["name", "truck", "strokeWidth", "1.5", 1, "status-icon", 3, "size"], [1, "status-card", "status-delivered"], ["name", "circle-check-big", "strokeWidth", "1.5", 1, "status-icon", 3, "size"]], template: function OrderByStatusComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "lucide-angular", 2);
      \u0275\u0275elementStart(3, "div", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4);
      \u0275\u0275text(6, "Placed");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5);
      \u0275\u0275element(8, "lucide-angular", 6);
      \u0275\u0275elementStart(9, "div", 3);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 4);
      \u0275\u0275text(12, "Shipped");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 7);
      \u0275\u0275element(14, "lucide-angular", 8);
      \u0275\u0275elementStart(15, "div", 3);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 4);
      \u0275\u0275text(18, "Delivered");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("size", 22);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.data.placed);
      \u0275\u0275advance(4);
      \u0275\u0275property("size", 22);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.data.shipped);
      \u0275\u0275advance(4);
      \u0275\u0275property("size", 22);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.data.delivered);
    }
  }, dependencies: [LucideAngularComponent], styles: ["\n\n/*# sourceMappingURL=order-by-status.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderByStatusComponent, { className: "OrderByStatusComponent" });
})();

// src/app/admin/components/analytics/analytics.component.ts
function AnalyticsComponent_div_4_div_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275element(1, "lucide-angular", 43);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Loading chart...");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 24);
  }
}
function AnalyticsComponent_div_4_p_chart_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-chart", 44);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("data", ctx_r1.chartData)("options", ctx_r1.chartOptions);
  }
}
function AnalyticsComponent_div_4_ng_template_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div")(2, "h3", 46);
    \u0275\u0275text(3, "Sales Report");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 47);
    \u0275\u0275text(5, "Download sales data as Excel");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(6, "lucide-angular", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275property("size", 22);
  }
}
function AnalyticsComponent_div_4_small_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 49);
    \u0275\u0275text(1, "Select a report type");
    \u0275\u0275elementEnd();
  }
}
function AnalyticsComponent_div_4_small_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 49);
    \u0275\u0275text(1, "Select a period");
    \u0275\u0275elementEnd();
  }
}
function AnalyticsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "app-order-by-status", 5);
    \u0275\u0275elementStart(2, "div", 6)(3, "p-card", 7)(4, "div", 8)(5, "div", 9);
    \u0275\u0275element(6, "lucide-angular", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 11)(8, "p", 12);
    \u0275\u0275text(9, "Orders");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 13)(11, "div", 14)(12, "span", 15);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 16);
    \u0275\u0275text(15, "This Month");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(16, "div", 17);
    \u0275\u0275elementStart(17, "div", 18)(18, "span", 15);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 16);
    \u0275\u0275text(21, "Last Month");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(22, "p-card", 7)(23, "div", 8)(24, "div", 19);
    \u0275\u0275element(25, "lucide-angular", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 11)(27, "p", 12);
    \u0275\u0275text(28, "Earnings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 13)(30, "div", 14)(31, "span", 15);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 16);
    \u0275\u0275text(35, "This Month");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(36, "div", 17);
    \u0275\u0275elementStart(37, "div", 18)(38, "span", 15);
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 16);
    \u0275\u0275text(42, "Last Month");
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(43, "div", 21)(44, "div", 22)(45, "div")(46, "h3", 23);
    \u0275\u0275text(47, "Sales Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "p", 24);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 25)(51, "div", 26)(52, "label", 27);
    \u0275\u0275text(53, "From Year");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p-dropdown", 28);
    \u0275\u0275twoWayListener("ngModelChange", function AnalyticsComponent_div_4_Template_p_dropdown_ngModelChange_54_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fromYear, $event) || (ctx_r1.fromYear = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("onChange", function AnalyticsComponent_div_4_Template_p_dropdown_onChange_54_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFromYearChange($event.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 26)(56, "label", 27);
    \u0275\u0275text(57, "To Year");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "p-dropdown", 29);
    \u0275\u0275twoWayListener("ngModelChange", function AnalyticsComponent_div_4_Template_p_dropdown_ngModelChange_58_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.toYear, $event) || (ctx_r1.toYear = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("onChange", function AnalyticsComponent_div_4_Template_p_dropdown_onChange_58_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onToYearChange($event.value));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(59, "div", 30);
    \u0275\u0275template(60, AnalyticsComponent_div_4_div_60_Template, 4, 1, "div", 31)(61, AnalyticsComponent_div_4_p_chart_61_Template, 1, 2, "p-chart", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "p-card", 33);
    \u0275\u0275template(63, AnalyticsComponent_div_4_ng_template_63_Template, 7, 1, "ng-template", 34);
    \u0275\u0275elementStart(64, "form", 35);
    \u0275\u0275listener("ngSubmit", function AnalyticsComponent_div_4_Template_form_ngSubmit_64_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.downloadReport());
    });
    \u0275\u0275elementStart(65, "div", 36)(66, "label");
    \u0275\u0275text(67, "Report Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "p-dropdown", 37);
    \u0275\u0275listener("onChange", function AnalyticsComponent_div_4_Template_p_dropdown_onChange_68_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTypeChange($event.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(69, AnalyticsComponent_div_4_small_69_Template, 2, 0, "small", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 36)(71, "label");
    \u0275\u0275text(72);
    \u0275\u0275elementEnd();
    \u0275\u0275element(73, "p-dropdown", 39);
    \u0275\u0275template(74, AnalyticsComponent_div_4_small_74_Template, 2, 0, "small", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "button", 40);
    \u0275\u0275element(76, "lucide-angular", 41);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_18_0;
    let tmp_19_0;
    let tmp_22_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r1.data);
    \u0275\u0275advance(5);
    \u0275\u0275property("size", 22);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.data.currentMonthOrder);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.data.previousMonthOrder);
    \u0275\u0275advance(6);
    \u0275\u0275property("size", 22);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(33, 24, ctx_r1.data.currentMonthEarnings, "INR", "symbol", "1.0-0"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(40, 29, ctx_r1.data.previousMonthEarnings, "INR", "symbol", "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" ", ctx_r1.fromYear === ctx_r1.toYear ? "Monthly breakdown for " + ctx_r1.fromYear : "Yearly breakdown from " + ctx_r1.fromYear + " to " + ctx_r1.toYear, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("options", ctx_r1.yearOptions);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fromYear);
    \u0275\u0275advance(4);
    \u0275\u0275property("options", ctx_r1.toYearOptions);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.toYear);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.chartLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.chartLoading && ctx_r1.chartData);
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r1.reportForm);
    \u0275\u0275advance(4);
    \u0275\u0275property("options", ctx_r1.reportTypes);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_18_0 = ctx_r1.reportForm.get("type")) == null ? null : tmp_18_0.hasError("required")) && ((tmp_18_0 = ctx_r1.reportForm.get("type")) == null ? null : tmp_18_0.touched));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ((tmp_19_0 = ctx_r1.reportForm.get("type")) == null ? null : tmp_19_0.value) === "YEARLY" ? "Year" : ((tmp_19_0 = ctx_r1.reportForm.get("type")) == null ? null : tmp_19_0.value) === "QUARTERLY" ? "Quarter" : ((tmp_19_0 = ctx_r1.reportForm.get("type")) == null ? null : tmp_19_0.value) === "MONTHLY" ? "Month" : "Period", " ");
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx_r1.periodOptions)("disabled", !ctx_r1.periodOptions.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_22_0 = ctx_r1.reportForm.get("period")) == null ? null : tmp_22_0.hasError("required")) && ((tmp_22_0 = ctx_r1.reportForm.get("period")) == null ? null : tmp_22_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.downloading || ctx_r1.reportForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275property("size", 16);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.downloading ? "Downloading..." : "Download Excel", " ");
  }
}
function AnalyticsComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "lucide-angular", 43);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Loading analytics...");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", 24);
  }
}
var AnalyticsComponent = class _AnalyticsComponent {
  adminService;
  fb;
  messageService;
  data;
  reportForm;
  periodOptions = [];
  downloading = false;
  // Chart
  chartData = null;
  chartOptions;
  chartLoading = false;
  fromYear = null;
  toYear = null;
  yearOptions = [];
  reportTypes = [
    { value: "YEARLY", label: "Yearly" },
    { value: "QUARTERLY", label: "Quarterly" },
    { value: "MONTHLY", label: "Monthly" }
  ];
  constructor(adminService, fb, messageService) {
    this.adminService = adminService;
    this.fb = fb;
    this.messageService = messageService;
  }
  ngOnInit() {
    this.adminService.getAnalytics().subscribe((res) => {
      this.data = res;
    });
    this.reportForm = this.fb.group({
      type: [null, Validators.required],
      period: [null, Validators.required]
    });
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    for (let y = currentYear; y >= 2019; y--) {
      this.yearOptions.push(y);
    }
    this.buildChartOptions();
    this.fromYear = currentYear;
    this.toYear = currentYear;
    this.loadChart();
  }
  onFromYearChange(year) {
    this.fromYear = year;
    if (this.toYear !== null && this.toYear < year) {
      this.toYear = year;
    }
    this.loadChart();
  }
  onToYearChange(year) {
    this.toYear = year;
    if (this.fromYear !== null && this.fromYear > year) {
      this.fromYear = year;
    }
    this.loadChart();
  }
  get toYearOptions() {
    if (this.fromYear === null)
      return this.yearOptions;
    return this.yearOptions.filter((y) => y >= this.fromYear);
  }
  loadChart() {
    if (this.fromYear === null || this.toYear === null)
      return;
    this.chartLoading = true;
    this.adminService.getSalesChart(this.fromYear, this.toYear).subscribe({
      next: (res) => {
        this.chartData = {
          labels: res.labels,
          datasets: [{
            label: "Sales (\u20B9)",
            data: res.amounts,
            fill: true,
            tension: 0.4,
            borderColor: "#007185",
            backgroundColor: "rgba(0,113,133,0.10)",
            pointBackgroundColor: "#007185",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        };
        this.chartLoading = false;
      },
      error: () => {
        this.chartLoading = false;
      }
    });
  }
  buildChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#fff",
          borderColor: "#D5D9D9",
          borderWidth: 1,
          titleColor: "#0F1111",
          bodyColor: "#565959",
          padding: 12,
          callbacks: {
            label: (ctx) => ` \u20B9${ctx.parsed.y.toLocaleString("en-IN")}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#565959", font: { size: 12 } },
          border: { color: "#D5D9D9" }
        },
        y: {
          beginAtZero: true,
          grid: { color: "rgba(0,0,0,0.05)" },
          ticks: {
            color: "#565959",
            font: { size: 11 },
            callback: (value) => {
              if (value >= 1e5)
                return "\u20B9" + (value / 1e5).toFixed(1) + "L";
              if (value >= 1e3)
                return "\u20B9" + (value / 1e3).toFixed(0) + "K";
              return "\u20B9" + value;
            }
          },
          border: { color: "#D5D9D9" }
        }
      }
    };
  }
  onTypeChange(type) {
    this.reportForm.get("period")?.setValue(null);
    this.periodOptions = this.buildPeriodOptions(type);
  }
  buildPeriodOptions(type) {
    const now = /* @__PURE__ */ new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    if (type === "YEARLY") {
      return Array.from({ length: 10 }, (_, i) => {
        const year = currentYear - i;
        return { label: String(year), params: { year } };
      });
    }
    if (type === "MONTHLY") {
      const options = [];
      for (let month = currentMonth; month >= 1; month--) {
        const label = new Date(currentYear, month - 1, 1).toLocaleString("default", {
          month: "long",
          year: "numeric"
        });
        options.push({ label, params: { year: currentYear, month } });
      }
      return options;
    }
    if (type === "QUARTERLY") {
      const getQuarter = (month) => {
        if (month >= 4 && month <= 6)
          return 1;
        if (month >= 7 && month <= 9)
          return 2;
        if (month >= 10 && month <= 12)
          return 3;
        return 4;
      };
      const currentFYStart = currentMonth >= 4 ? currentYear : currentYear - 1;
      const currentFYEnd = currentFYStart + 1;
      const currentQ = getQuarter(currentMonth);
      const qMonthLabels = ["Apr\u2013Jun", "Jul\u2013Sep", "Oct\u2013Dec", "Jan\u2013Mar"];
      const fyLabel = `FY ${currentFYStart}\u2013${String(currentFYEnd).slice(-2)}`;
      const options = [];
      for (let q = currentQ; q >= 1; q--) {
        const qYear = q === 4 ? currentFYEnd : currentFYStart;
        options.push({
          label: `Q${q} ${qMonthLabels[q - 1]} ${fyLabel}`,
          params: { year: qYear, quarter: q, fyStart: currentFYStart }
        });
      }
      return options;
    }
    return [];
  }
  downloadReport() {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
      return;
    }
    const { type, period } = this.reportForm.value;
    this.downloading = true;
    this.adminService.getSalesReport(type, period.params).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `sales-report-${type.toLowerCase()}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.downloading = false;
      },
      error: () => {
        this.messageService.add({ severity: "error", summary: "Error", detail: "Failed to download report", life: 4e3 });
        this.downloading = false;
      }
    });
  }
  static \u0275fac = function AnalyticsComponent_Factory(t) {
    return new (t || _AnalyticsComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MessageService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnalyticsComponent, selectors: [["app-analytics"]], decls: 7, vars: 2, consts: [["loading", ""], ["position", "top-right"], [1, "page-wrap"], [1, "section-title"], [4, "ngIf", "ngIfElse"], [3, "data"], [1, "metrics-row"], ["styleClass", "metric-card"], [1, "metric-inner"], [1, "metric-icon", "metric-icon--orders"], ["name", "shopping-bag", "strokeWidth", "1.5", 3, "size"], [1, "metric-content"], [1, "metric-label"], [1, "metric-periods"], [1, "metric-period"], [1, "metric-value"], [1, "metric-period-label"], [1, "metric-divider"], [1, "metric-period", "metric-period--prev"], [1, "metric-icon", "metric-icon--earnings"], ["name", "indian-rupee", "strokeWidth", "1.5", 3, "size"], [1, "chart-card"], [1, "chart-card-header"], [1, "chart-title"], [1, "chart-sub"], [1, "chart-filters"], [1, "chart-filter-group"], [1, "filter-label"], ["placeholder", "From", "styleClass", "year-drop", 3, "ngModelChange", "onChange", "options", "ngModel"], ["placeholder", "To", "styleClass", "year-drop", 3, "ngModelChange", "onChange", "options", "ngModel"], [1, "chart-body"], ["class", "chart-spinner", 4, "ngIf"], ["type", "line", "height", "280px", 3, "data", "options", 4, "ngIf"], ["styleClass", "report-card"], ["pTemplate", "header"], [1, "report-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["formControlName", "type", "optionLabel", "label", "optionValue", "value", "placeholder", "Select type", 3, "onChange", "options"], ["class", "field-error", 4, "ngIf"], ["formControlName", "period", "optionLabel", "label", "placeholder", "Select period", 3, "options", "disabled"], ["type", "submit", 1, "download-btn", "flex", "items-center", "gap-2", 3, "disabled"], ["name", "download", "strokeWidth", "2", 3, "size"], [1, "chart-spinner"], ["name", "loader-circle", "strokeWidth", "2", 1, "animate-spin", 3, "size"], ["type", "line", "height", "280px", 3, "data", "options"], [1, "report-card-header"], [1, "report-title"], [1, "report-sub"], ["name", "file-spreadsheet", "strokeWidth", "1.5", 1, "report-header-icon", 3, "size"], [1, "field-error"], [1, "analytics-loading"]], template: function AnalyticsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast", 1);
      \u0275\u0275elementStart(1, "div", 2)(2, "h2", 3);
      \u0275\u0275text(3, "Analytics");
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, AnalyticsComponent_div_4_Template, 78, 34, "div", 4)(5, AnalyticsComponent_ng_template_5_Template, 4, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const loading_r3 = \u0275\u0275reference(6);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.data)("ngIfElse", loading_r3);
    }
  }, dependencies: [NgIf, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, NgModel, FormGroupDirective, FormControlName, PrimeTemplate, Card, Dropdown, Toast, UIChart, LucideAngularComponent, OrderByStatusComponent, CurrencyPipe], styles: ['@charset "UTF-8";\n\n/* src/app/admin/components/analytics/analytics.component.scss */\n.metrics-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.25rem;\n  margin-bottom: 1.5rem;\n}\n@media (max-width: 640px) {\n  .metrics-row {\n    grid-template-columns: 1fr;\n  }\n}\n::ng-deep .metric-card.p-card {\n  border: 1px solid var(--border) !important;\n  background: var(--bg-card) !important;\n  border-radius: var(--radius-lg) !important;\n}\n::ng-deep .metric-card.p-card .p-card-body {\n  padding: 1.5rem !important;\n}\n.metric-inner {\n  display: flex;\n  gap: 1.25rem;\n  align-items: flex-start;\n}\n.metric-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: var(--radius);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-size: 1.3rem;\n}\n.metric-icon--orders {\n  background: rgba(255, 153, 0, 0.15);\n  color: var(--primary-dark);\n}\n.metric-icon--earnings {\n  background: rgba(6, 125, 98, 0.12);\n  color: var(--success);\n}\n.metric-content {\n  flex: 1;\n}\n.metric-label {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: var(--text-muted);\n  margin: 0 0 1rem;\n}\n.metric-periods {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.metric-period {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.metric-period--prev .metric-value {\n  color: var(--text-muted);\n  font-size: 1.2rem;\n}\n.metric-period--prev .metric-period-label {\n  color: var(--text-dim);\n}\n.metric-value {\n  font-family: var(--font-display);\n  font-size: 1.65rem;\n  font-weight: 700;\n  color: var(--text);\n  line-height: 1;\n}\n.metric-period-label {\n  font-size: 0.72rem;\n  color: var(--text-muted);\n}\n.metric-divider {\n  width: 1px;\n  height: 40px;\n  background: var(--border);\n}\n.chart-card {\n  background: var(--bg-card);\n  border: 1.5px solid var(--border);\n  border-radius: var(--radius-lg);\n  margin-bottom: 1.5rem;\n  overflow: hidden;\n}\n.chart-card-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 1.25rem 1.5rem 1rem;\n  border-bottom: 1px solid var(--border);\n}\n.chart-title {\n  font-family: var(--font-display);\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--text);\n  margin: 0 0 0.2rem;\n}\n.chart-sub {\n  font-size: 0.82rem;\n  color: var(--text-muted);\n  margin: 0;\n}\n.chart-filters {\n  display: flex;\n  align-items: flex-end;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.chart-filter-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.filter-label {\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: var(--text-muted);\n}\n.year-drop.p-dropdown {\n  min-width: 110px !important;\n  min-height: 36px !important;\n}\n.year-drop.p-dropdown .p-dropdown-label {\n  padding: 0.45rem 0.75rem !important;\n  font-size: 0.85rem !important;\n}\n.chart-body {\n  padding: 1.25rem 1.5rem 1.5rem;\n  min-height: 300px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.chart-body p-chart {\n  width: 100%;\n}\n.chart-spinner {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--text-muted);\n  font-size: 0.9rem;\n}\n::ng-deep .report-card.p-card {\n  border: 1px solid var(--border) !important;\n  background: var(--bg-card) !important;\n  border-radius: var(--radius-lg) !important;\n  margin-bottom: 2rem;\n}\n::ng-deep .report-card.p-card .p-card-header {\n  padding: 1.25rem 1.5rem 0 !important;\n}\n::ng-deep .report-card.p-card .p-card-body {\n  padding: 1rem 1.5rem 1.5rem !important;\n}\n.report-card-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n.report-title {\n  font-family: var(--font-display);\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--text);\n  margin: 0 0 0.25rem;\n}\n.report-sub {\n  font-size: 0.82rem;\n  color: var(--text-muted);\n  margin: 0;\n}\n.report-header-icon {\n  font-size: 1.6rem;\n  color: var(--success);\n  opacity: 0.7;\n}\n.report-form {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: 1rem;\n  padding-top: 0.5rem;\n}\n.report-form .form-group {\n  flex: 1;\n  min-width: 180px;\n  margin-bottom: 0;\n}\n.download-btn {\n  height: 42px;\n  flex-shrink: 0;\n  padding: 0 1.25rem;\n  background: var(--primary);\n  color: #0F1111;\n  border: none;\n  border-radius: var(--radius);\n  font-family: var(--font-ui);\n  font-weight: 700;\n  font-size: 0.88rem;\n  cursor: pointer;\n  transition: background 0.15s, box-shadow 0.15s;\n}\n.download-btn:hover:not(:disabled) {\n  background: var(--primary-h);\n  box-shadow: var(--glow);\n}\n.download-btn:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.analytics-loading {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 4rem 2rem;\n  color: var(--text-muted);\n  font-size: 0.95rem;\n}\n.analytics-loading i {\n  font-size: 1.4rem;\n  color: var(--primary-l);\n}\n/*# sourceMappingURL=analytics.component.css.map */\n'], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnalyticsComponent, { className: "AnalyticsComponent" });
})();

// src/app/admin/admin-routing.module.ts
var routes = [
  { path: "", component: AdminComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "category", component: PostCategoryComponent },
  { path: "product", component: PostProductComponent },
  { path: "post-coupons", component: PostCouponComponent },
  { path: "coupons", component: CouponsComponent },
  { path: "orders", component: OrdersComponent },
  { path: "faq/:productId", component: PostProductFaqComponent },
  { path: "product/:productId", component: UpdateProductComponent },
  { path: "analytics", component: AnalyticsComponent }
];
var AdminRoutingModule = class _AdminRoutingModule {
  static \u0275fac = function AdminRoutingModule_Factory(t) {
    return new (t || _AdminRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};

// src/app/admin/admin.module.ts
var AdminModule = class _AdminModule {
  static \u0275fac = function AdminModule_Factory(t) {
    return new (t || _AdminModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ providers: [MessageService], imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    HttpClientModule
  ] });
};
export {
  AdminModule
};
//# sourceMappingURL=chunk-HBHOJNMO.js.map
