package com.mynewapp

import android.os.Bundle
import android.util.Log
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.content.Intent
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactContext

class MainActivity : ReactActivity() {
  private val TAG = "MainActivity"
  
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "MyNewApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    try {
      super.onCreate(savedInstanceState)
      setupReactInstanceListener()
    } catch (e: Exception) {
      Log.e(TAG, "Error in onCreate: ${e.message}", e)
      restartApp()
    }
  }

  private fun setupReactInstanceListener() {
    try {
      val reactInstanceManager = (application as ReactApplication).reactNativeHost.reactInstanceManager
      reactInstanceManager.addReactInstanceEventListener(object : ReactInstanceManager.ReactInstanceEventListener {
        override fun onReactContextInitialized(context: ReactContext) {
          Log.i(TAG, "React context initialized successfully")
        }
      })
    } catch (e: Exception) {
      Log.e(TAG, "Error setting up React instance listener: ${e.message}", e)
    }
  }

  private fun restartApp() {
    try {
      val intent = Intent(this, MainActivity::class.java)
      intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK)
      startActivity(intent)
      finish()
    } catch (e: Exception) {
      Log.e(TAG, "Error restarting app: ${e.message}", e)
    }
  }

  override fun onResume() {
    try {
      super.onResume()
      Log.d(TAG, "Activity resumed")
    } catch (e: Exception) {
      Log.e(TAG, "Error in onResume: ${e.message}", e)
    }
  }

  override fun onPause() {
    try {
      super.onPause()
      Log.d(TAG, "Activity paused")
    } catch (e: Exception) {
      Log.e(TAG, "Error in onPause: ${e.message}", e)
    }
  }

  override fun onDestroy() {
    try {
      super.onDestroy()
      Log.d(TAG, "Activity destroyed")
    } catch (e: Exception) {
      Log.e(TAG, "Error in onDestroy: ${e.message}", e)
    }
  }
}
