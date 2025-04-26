package com.mynewapp

import android.app.Application
import android.content.Context
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here
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
      
      if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
        load()
      }
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }

  override fun attachBaseContext(base: Context) {
    super.attachBaseContext(base)
    // Initialize the ApplicationContext
    initializeContext(base)
  }

  private fun initializeContext(context: Context) {
    try {
      // Ensure the application context is properly set
      if (context != null) {
        context.applicationContext
      }
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }
}
