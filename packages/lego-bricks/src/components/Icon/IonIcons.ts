/**
 * Definitions for the <ion-icon> web component. Props are copied from the ionicons codebase: https://github.com/ionic-team/ionicons/blob/main/src/components.d.ts
 */

export interface IonIcon {
  /**
   * The color to use for the background of the item.
   */
  color?: string;
  /**
   * Specifies whether the icon should horizontally flip when `dir` is `"rtl"`.
   */
  flipRtl?: boolean;
  /**
   * A combination of both `name` and `src`. If a `src` url is detected it will set the `src` property. Otherwise it assumes it's a built-in named SVG and set the `name` property.
   */
  icon?: string;
  /**
   * Specifies which icon to use on `ios` mode.
   */
  ios?: string;
  /**
   * If enabled, ion-icon will be loaded lazily when it's visible in the viewport. Default, `false`.
   */
  lazy?: boolean;
  /**
   * Specifies which icon to use on `md` mode.
   */
  md?: string;
  /**
   * The mode determines which platform styles to use.
   */
  mode?: string;
  /**
   * Specifies which icon to use from the built-in set of icons.
   */
  name?: string;
  /**
   * When set to `false`, SVG content that is HTTP fetched will not be checked if the response SVG content has any `<script>` elements, or any attributes that start with `on`, such as `onclick`.
   * @default true
   */
  sanitize?: boolean;
  /**
   * The size of the icon. Available options are: `"small"` and `"large"`.
   */
  size?: string;
  /**
   * Specifies the exact `src` of an SVG file to use.
   */
  src?: string;
}
