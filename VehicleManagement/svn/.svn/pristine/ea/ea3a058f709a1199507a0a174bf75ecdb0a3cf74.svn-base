package com.quanlyxe;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener; 
public class MainActivity extends ReactActivity {
    private PermissionListener listener; 
   /**
    * Returns the name of the main component registered from JavaScript.
    * This is used to schedule rendering of the component.
    */
   @Override
   protected String getMainComponentName() {
       return "QuanLyXe";
   }

   @Override
   protected ReactActivityDelegate createReactActivityDelegate() {
       return new ReactActivityDelegate(this, getMainComponentName()) {
   @Override
   protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
       }
   };
 }
}
