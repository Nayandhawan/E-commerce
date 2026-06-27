import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChartModule } from 'primeng/chart';

import {
  LucideAngularModule,
  Search, Heart, ShoppingCart, ShoppingBag, Tag, Zap, Sparkles, SearchX,
  Receipt, MapPin, PenLine, ScrollText, CircleQuestionMark, X, ArrowRight,
  CircleCheckBig, CircleCheck, CreditCard, Minus, Plus, FileSpreadsheet,
  Download, LoaderCircle, Send, Mail, Lock, User, Camera, CircleAlert,
  Star, Pencil, Shield, RefreshCw, Truck, IndianRupee, LayoutGrid, Trash2,
  BookOpen, Cpu, Gem, Car, Watch, Baby, Footprints, Shirt, Gamepad2,
  Dumbbell, ShoppingBasket, Briefcase, SquareStack, LogIn, LogOut,
  Eye, EyeOff, Hash, Wallet, Calendar, House, Gift, UserPlus,
  ChevronDown, ChevronUp, Phone,
  // Admin panel icons
  Package, Layers, MessageCircleQuestionMark, Ticket, Percent, CalendarX2,
  // Previously missing icons
  Bell, BellOff, Menu, ArrowUp, ArrowDown, ArrowLeft,
  ChevronLeft, ChevronRight,
  CircleHelp, FilterX, GitCompare, ZoomIn,
  Check, Share2, Save, FileText,
  ShieldCheck, KeyRound, Undo2, XCircle, Smartphone,
  BookMarked, MapPinOff, PackageX, ImagePlus, Upload,
} from 'lucide-angular';

const ICONS = {
  Search, Heart, ShoppingCart, ShoppingBag, Tag, Zap, Sparkles, SearchX,
  Receipt, MapPin, PenLine, ScrollText, CircleQuestionMark, X, ArrowRight,
  CircleCheckBig, CircleCheck, CreditCard, Minus, Plus, FileSpreadsheet,
  Download, LoaderCircle, Send, Mail, Lock, User, Camera, CircleAlert,
  Star, Pencil, Shield, RefreshCw, Truck, IndianRupee, LayoutGrid, Trash2,
  BookOpen, Cpu, Gem, Car, Watch, Baby, Footprints, Shirt, Gamepad2,
  Dumbbell, ShoppingBasket, Briefcase, SquareStack, LogIn, LogOut,
  Eye, EyeOff, Hash, Wallet, Calendar, House, Gift, UserPlus,
  ChevronDown, ChevronUp, Phone,
  // Admin panel icons
  Package, Layers, MessageCircleQuestionMark, Ticket, Percent, CalendarX2,
  // Previously missing icons
  Bell, BellOff, Menu, ArrowUp, ArrowDown, ArrowLeft,
  ChevronLeft, ChevronRight,
  CircleHelp, FilterX, GitCompare, ZoomIn,
  Check, Share2, Save, FileText,
  ShieldCheck, KeyRound, Undo2, XCircle, Smartphone,
  BookMarked, MapPinOff, PackageX, ImagePlus, Upload,
};

const PRIME_MODULES = [
  ButtonModule,
  InputTextModule,
  PasswordModule,
  CardModule,
  TableModule,
  DropdownModule,
  DialogModule,
  ToastModule,
  ProgressSpinnerModule,
  TagModule,
  BadgeModule,
  AvatarModule,
  MenuModule,
  ToolbarModule,
  PaginatorModule,
  ChipModule,
  DividerModule,
  InputTextareaModule,
  FileUploadModule,
  CalendarModule,
  RatingModule,
  InputNumberModule,
  TooltipModule,
  SelectButtonModule,
  SkeletonModule,
  MessageModule,
  MessagesModule,
  SplitButtonModule,
  OverlayPanelModule,
  ChartModule,
];

@NgModule({
  imports: [...PRIME_MODULES, LucideAngularModule.pick(ICONS)],
  exports: [...PRIME_MODULES, LucideAngularModule],
})
export class PrimeNGModule {}
