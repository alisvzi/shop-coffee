/* Re-export project icons using lucide-react to replace legacy SVGs */
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Banknote,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  CircleDot,
  Clock,
  Dot,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Heart,
  HelpCircle,
  Info,
  List,
  LogOut,
  Maximize,
  MessageSquare,
  Play,
  RefreshCcw,
  Settings,
  ShoppingCart,
  Star,
  User,
  Users,
  X,
} from "lucide-react";
import React from "react";

type IconProps = React.SVGAttributes<SVGElement> & {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

type IconComponent = React.ComponentType<IconProps>;

const withIconProps = (Icon: IconComponent) =>
  function Wrapped(props: IconProps) {
    const { width, height, color, strokeWidth, className, ...rest } = props;
    const size =
      (typeof width === "number" ? width : undefined) ??
      (typeof height === "number" ? height : undefined) ??
      24;
    return (
      <Icon
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...rest}
      />
    );
  };

export const IconArrowLeftFill = withIconProps(ArrowLeft);
export const IconArrowLeft = withIconProps(ArrowLeft);
export const IconBasket = withIconProps(ShoppingCart);
export const IconCalendar = withIconProps(Calendar);
export const IconCheck = withIconProps(Check);
export const IconChevronDown = withIconProps(ChevronDown);
export const IconChevronUp = withIconProps(ChevronUp);
export const IconClock = withIconProps(Clock);
export const IconClose = withIconProps(X);
export const IconComment = withIconProps(MessageSquare);
export const IconDoc = withIconProps(FileText);
export const IconDot = withIconProps(Dot);
export const IconDownload = withIconProps(Download);
export const IconEnrollment = withIconProps(GraduationCap);
export const IconError = withIconProps(CircleAlert);
export const IconEye = withIconProps(Eye);
export const IconFullScreen = withIconProps(Maximize);
export const IconInfo = withIconProps(Info);
export const IconLeft = withIconProps(ArrowLeft);
export const IconLevel = withIconProps(BarChart3);
export const IconLogout = withIconProps(LogOut);
export const IconPlay = withIconProps(Play);
export const IconQuiz = withIconProps(HelpCircle);
export const IconRecord = withIconProps(CircleDot);
export const IconRefresh = withIconProps(RefreshCcw);
export const IconRight = withIconProps(ArrowRight);
export const IconUp = withIconProps(ArrowUp);
export const IconSetting = withIconProps(Settings);
export const IconStar = withIconProps(Star);
export const IconStudents = withIconProps(Users);
export const IconToc = withIconProps(List);
export const IconToman = withIconProps(Banknote);
export const IconUserProfile = withIconProps(User);
export const IconVideo = withIconProps(Play);
export const IconHeart = withIconProps(Heart);
