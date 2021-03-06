import { RedirectOrComponent } from "./RedirectOrComponent";

export type CheckAuthenticationFunc = () => boolean;

export type CheckAccessRightFunc<Permissions = unknown> = (
  permissions: Permissions
) => boolean;

export interface PermissionsContextConfig {
  /** Handles describe how to deal with particular situations within the
   * scope of permissions. */
  handles: Partial<{
    /**
     * When users attempt to access a protected route without authenticating,
     * this field will be used to handle the situation.
     * @see RedirectOrComponent
     */
    unauthorized: RedirectOrComponent;
    /**
     * When users attempt to access a resource without property permission,
     * this field will be used to handle the situation.
     *
     * **NOTE:** For routes rendered by the `<ConfiguredRoutes />` component,
     * this setting will only be effective when `shouldRenderForbidden`
     * is set to `true`.
     * @see RedirectOrComponent
     */
    forbidden: RedirectOrComponent;
  }>;
  /** A function to check whether the user is authenticated.
   * Return a boolean value to indicate whether the user is authenticated. */
  checkAuthentication: CheckAuthenticationFunc;
  /** A function to check if the current logged in user has permission to
   * access a resource that requires `permission. Return a boolean value to
   * indicate whether the user is allowed to access this resource.*/
  checkAccessRight: CheckAccessRightFunc;
}
