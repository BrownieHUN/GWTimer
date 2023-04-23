/*
 * Copyright 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.example.android.wearable.composestarter.presentation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Devices
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.wear.compose.material.CircularProgressIndicator
import androidx.wear.compose.material.Icon
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import com.example.android.wearable.composestarter.R
import com.example.android.wearable.composestarter.presentation.theme.WearAppTheme
import java.lang.Math.abs
import java.util.concurrent.TimeUnit
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking

/**
 * Simple "Hello, World" app meant as a starting point for a new project using Compose for Wear OS.
 *
 * Displays only a centered [Text] composable, and the actual text varies based on the shape of the
 * device (round vs. square/rectangular).
 *
 * If you plan to have multiple screens, use the Wear version of Compose Navigation. You can carry
 * over your knowledge from mobile and it supports the swipe-to-dismiss gesture (Wear OS's
 * back action). For more information, go here:
 * https://developer.android.com/reference/kotlin/androidx/wear/compose/navigation/package-summary
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            WearApp()
        }
    }
}

@Composable
fun WearApp() {
    WearAppTheme {
        /* If you have enough items in your list, use [ScalingLazyColumn] which is an optimized
         * version of LazyColumn for wear devices with some added features. For more information,
         * see d.android.com/wear/compose.
         */
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colors.background)
                .selectableGroup(),
            verticalArrangement = Arrangement.Center
        ) {
            mainScreen()
        }
    }
}

var startValue = 0.0f
var dur = 10

@Composable
fun Animation(): Float {
    val progressAnimation by rememberInfiniteTransition().animateFloat(
        initialValue = startValue,
        targetValue = 1.0f,
        animationSpec = infiniteRepeatable(
            animation = tween(dur*1000, 0, LinearEasing)
        )
    )
    return progressAnimation
}

@Composable
fun mainScreen(modifier: Modifier = Modifier) {



    Box(modifier = Modifier.fillMaxSize()) {
        CircularProgressIndicator(
            modifier = Modifier
                .fillMaxSize(),
            progress = Animation(),
            strokeWidth = 10.dp,
        )

        Column(
            modifier = Modifier.align(Alignment.Center),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = remainingSeconds(),
                fontSize = 24.sp,
                color = Color.White,
                textAlign = TextAlign.Center
            )
            Text(
                text = "7:45 - 9:30",
                fontSize = 12.sp,
                color = Color.Gray,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
fun remainingSeconds(): String {
    var rem by remember { mutableStateOf("0") }
    while (true) {
        runBlocking {
            delay(1, TimeUnit.SECONDS)
        }
        rem = "0:${kotlin.math.ceil((dur * 10 - kotlin.math.ceil(Animation() * 100)) / 10)}"
        rem = rem.substringBefore(".")
        return rem
    }
}

suspend fun delay(time: Long, unit: TimeUnit = TimeUnit.MILLISECONDS) {}

@Preview(device = Devices.WEAR_OS_SMALL_ROUND, showSystemUi = true)
@Composable
fun DefaultPreview() {
    WearApp()
}
