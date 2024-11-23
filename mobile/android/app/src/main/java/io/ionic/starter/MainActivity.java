package io.ionic.starter;

import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    if (BuildConfig.DEBUG) {
      WebView.setWebContentsDebuggingEnabled(true);
    }
  }
}
