package com.mynewapp

import android.app.Application
import android.content.Context
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

class MainApplication : Application(), ReactApplication {

  private val TAG = "MainApplication"

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            try {
              PackageList(this).packages.apply {
                // Packages that cannot be autolinked yet can be added manually here
              }
            } catch (e: Exception) {
              Log.e(TAG, "Error getting packages: ${e.message}", e)
              emptyList()
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    try {
      // Initialize SoLoader
      SoLoader.init(this, false)
      
      // Initialize the React Native New Architecture if enabled
      if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
        load()
      }

      // Initialize any other necessary libraries/SDKs here
      initializeThirdPartyLibraries()

    } catch (e: Exception) {
      Log.e(TAG, "Error in onCreate: ${e.message}", e)
      // Continue app initialization even if there's an error
      // The app can still potentially function without some features
    }
  }

  private fun initializeThirdPartyLibraries() {
    try {
      // Initialize any third-party libraries that need to be initialized at app startup
      // For example: Analytics, Crash Reporting, etc.
    } catch (e: Exception) {
      Log.e(TAG, "Error initializing third-party libraries: ${e.message}", e)
    }
  }

  override fun attachBaseContext(base: Context) {
    try {
      super.attachBaseContext(base)
      // Initialize the ApplicationContext
      initializeContext(base)
    } catch (e: Exception) {
      Log.e(TAG, "Error in attachBaseContext: ${e.message}", e)
      // If we can't attach the base context, we should still call super
      // to maintain basic application functionality
      super.attachBaseContext(base)
    }
  }

  private fun initializeContext(context: Context) {
    try {
      if (context != null) {
        // Ensure we have a valid application context
        val appContext = context.applicationContext
        
        // Set up any context-dependent initializations here
        setupContextDependencies(appContext)
      }
    } catch (e: Exception) {
      Log.e(TAG, "Error initializing context: ${e.message}", e)
    }
  }

  private fun setupContextDependencies(appContext: Context) {
    try {
      // Initialize any context-dependent features
      // For example: SharedPreferences, Database, etc.
    } catch (e: Exception) {
      Log.e(TAG, "Error setting up context dependencies: ${e.message}", e)
    }
  }
}
