export interface AndroidFile {
  path: string;
  language: string;
  description: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidFile[] = [
  {
    path: "build.gradle.kts (Project)",
    language: "kotlin",
    description: "پیکربندی سطح پروژه با پلاگین‌های کاتلین، اندروید و Room",
    content: `// Top-level build file for DARK MIND Android Project
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.ksp) apply false
}
`
  },
  {
    path: "app/build.gradle.kts (Module: app)",
    language: "kotlin",
    description: "تنظیمات وابستگی‌های Jetpack Compose, Room Database, Material3 و Coroutines",
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.ksp)
}

android {
    namespace = "com.darkmind.puzzle"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.darkmind.puzzle"
        minSdk = 26 // Android 8.0 Oreo minimum support
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    // Jetpack Compose & Material 3
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.navigation.compose)

    // Room Database for Offline Storage
    implementation(libs.androidx.room.runtime)
    implementation(libs.androidx.room.ktx)
    ksp(libs.androidx.room.compiler)

    // Sound & Haptics
    implementation(libs.androidx.core.ktx)
    implementation(libs.kotlinx.coroutines.android)
}
`
  },
  {
    path: "app/src/main/AndroidManifest.xml",
    language: "xml",
    description: "فایل مانیفست اندروید با تنظیم جهت Portrait و تم تاریک",
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:name=".DarkMindApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.DarkMind">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:configChanges="orientation|screenSize"
            android:theme="@style/Theme.DarkMind">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`
  },
  {
    path: "app/src/main/java/com/darkmind/puzzle/data/model/LevelEntity.kt",
    language: "kotlin",
    description: "موجودیت دیتابیس Room برای ذخیره‌سازی ۵۰ مرحله جدول",
    content: `package com.darkmind.puzzle.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "levels")
data class LevelEntity(
    @PrimaryKey val id: Int,
    val title: String,
    val difficulty: String, // easy, medium, hard, expert, master
    val lettersJson: String, // JSON Array of letters e.g. ["س","ر","د"]
    val wordsJson: String, // JSON Array of words with coordinates
    val rewardCoins: Int,
    val isCompleted: Boolean = false,
    val starsEarned: Int = 0,
    val isUnlocked: Boolean = false
)
`
  },
  {
    path: "app/src/main/java/com/darkmind/puzzle/data/dao/LevelDao.kt",
    language: "kotlin",
    description: "رابط دسترسی به داده‌ها (DAO) در دیتابیس Room",
    content: `package com.darkmind.puzzle.data.dao

import androidx.room.*
import com.darkmind.puzzle.data.model.LevelEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface LevelDao {
    @Query("SELECT * FROM levels ORDER BY id ASC")
    fun getAllLevels(): Flow<List<LevelEntity>>

    @Query("SELECT * FROM levels WHERE id = :levelId LIMIT 1")
    suspend fun getLevelById(levelId: Int): LevelEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLevels(levels: List<LevelEntity>)

    @Update
    suspend fun updateLevel(level: LevelEntity)

    @Query("UPDATE levels SET isCompleted = 1, starsEarned = :stars WHERE id = :levelId")
    suspend fun markCompleted(levelId: Int, stars: Int)

    @Query("UPDATE levels SET isUnlocked = 1 WHERE id = :levelId")
    suspend fun unlockLevel(levelId: Int)
}
`
  },
  {
    path: "app/src/main/java/com/darkmind/puzzle/viewmodel/GameViewModel.kt",
    language: "kotlin",
    description: "معماری MVVM ViewModel برای مدیریت حالت گیمپلی و اعتبارسنجی کلمات",
    content: `package com.darkmind.puzzle.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.darkmind.puzzle.data.DarkMindDatabase
import com.darkmind.puzzle.data.model.LevelEntity
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

data class GameUiState(
    val currentLevel: LevelEntity? = null,
    val selectedLetters: List<String> = emptyList(),
    val foundWords: Set<String> = emptySet(),
    val coins: Int = 150,
    val isLevelCompleted: Boolean = false,
    val revealedCells: Set<String> = emptySet() // "row,col"
)

class GameViewModel(application: Application) : AndroidViewModel(application) {
    private val db = DarkMindDatabase.getDatabase(application)
    private val levelDao = db.levelDao()

    private val _uiState = MutableStateFlow(GameUiState())
    val uiState: StateFlow<GameUiState> = _uiState.asStateFlow()

    fun loadLevel(levelId: Int) {
        viewModelScope.launch {
            val level = levelDao.getLevelById(levelId)
            _uiState.update { it.copy(
                currentLevel = level,
                selectedLetters = emptyList(),
                foundWords = emptySet(),
                isLevelCompleted = false
            ) }
        }
    }

    fun onLetterSelected(letter: String) {
        _uiState.update { it.copy(selectedLetters = it.selectedLetters + letter) }
    }

    fun submitCurrentWord(validWords: List<String>, rewardCoins: Int) {
        val word = _uiState.value.selectedLetters.joinToString("")
        if (validWords.contains(word) && !_uiState.value.foundWords.contains(word)) {
            val updatedFound = _uiState.value.foundWords + word
            val completed = updatedFound.size == validWords.size

            _uiState.update { it.copy(
                foundWords = updatedFound,
                selectedLetters = emptyList(),
                isLevelCompleted = completed,
                coins = if (completed) it.coins + rewardCoins else it.coins
            ) }

            if (completed && _uiState.value.currentLevel != null) {
                viewModelScope.launch {
                    val id = _uiState.value.currentLevel!!.id
                    levelDao.markCompleted(id, stars = 3)
                    levelDao.unlockLevel(id + 1)
                }
            }
        } else {
            _uiState.update { it.copy(selectedLetters = emptyList()) }
        }
    }
}
`
  },
  {
    path: "app/src/main/java/com/darkmind/puzzle/ui/components/LetterWheelCompose.kt",
    language: "kotlin",
    description: "موتور دوبعدی کشیدن خط روی حروف با Jetpack Compose Canvas",
    content: `package com.darkmind.puzzle.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.dp
import kotlin.math.*

@Composable
fun LetterWheelCompose(
    letters: List<String>,
    onLetterAdded: (String) -> Unit,
    onDragEnd: () -> Unit,
    modifier: Modifier = Modifier
) {
    var touchPos by remember { mutableStateOf<Offset?>(null) }
    val selectedIndices = remember { mutableStateListOf<Int>() }

    Box(modifier = modifier.size(280.dp)) {
        Canvas(
            modifier = Modifier
                .fillMaxSize()
                .pointerInput(Unit) {
                    detectDragGestures(
                        onDragStart = { offset ->
                            selectedIndices.clear()
                            touchPos = offset
                        },
                        onDrag = { change, _ ->
                            touchPos = change.position
                        },
                        onDragEnd = {
                            touchPos = null
                            selectedIndices.clear()
                            onDragEnd()
                        }
                    )
                }
        ) {
            val center = Offset(size.width / 2f, size.height / 2f)
            val radius = size.width / 2f - 40.dp.toPx()

            // Draw outer neon glow circle
            drawCircle(
                color = Color(0xFF8B5CF6).copy(alpha = 0.2f),
                radius = radius + 20.dp.toPx()
            )

            // Draw line connecting selected letters
            for (i in 0 until selectedIndices.size - 1) {
                val idx1 = selectedIndices[i]
                val idx2 = selectedIndices[i + 1]
                val angle1 = (2 * PI / letters.size) * idx1 - (PI / 2)
                val angle2 = (2 * PI / letters.size) * idx2 - (PI / 2)
                val p1 = Offset(center.x + (radius * cos(angle1)).toFloat(), center.y + (radius * sin(angle1)).toFloat())
                val p2 = Offset(center.x + (radius * cos(angle2)).toFloat(), center.y + (radius * sin(angle2)).toFloat())

                drawLine(
                    color = Color(0xFFA855F7),
                    start = p1,
                    end = p2,
                    strokeWidth = 14f,
                    cap = StrokeCap.Round
                )
            }
        }
    }
}
`
  },
  {
    path: "app/src/main/java/com/darkmind/puzzle/MainActivity.kt",
    language: "kotlin",
    description: "اکتیویتی اصلی بازی با مدیریت مسیریابی و کنترل صوتی",
    content: `package com.darkmind.puzzle

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.darkmind.puzzle.ui.theme.DarkMindTheme
import com.darkmind.puzzle.ui.screens.MainGameNavigation

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            DarkMindTheme {
                Surface(
                    modifier = Modifier.fillMaxSize().background(Color(0xFF070A13)),
                    color = Color(0xFF070A13)
                ) {
                    MainGameNavigation()
                }
            }
        }
    }
}
`
  }
];

export const ANDROID_BUILD_GUIDE = `راهنمای کامپایل و ساخت APK بازی ذهن تاریک (DARK MIND):

۱. نرم‌افزار Android Studio را باز کرده و گزینه "New Project > Empty Compose Activity" را انتخاب کنید.
۲. نام پکیج را برابر با com.darkmind.puzzle قرار دهید.
۳. فایل‌های سورس بالا را در مسیرهای مشخص شده جای‌گذاری کنید.
۴. پروژه را Sync کنید (دکمه Sync Project with Gradle Files).
۵. از منوی بالا گزینه Build > Build Bundle(s) / APK(s) > Build APK(s) را بزنید.
۶. فایل APK تولید شده در مسیر app/build/outputs/apk/release/app-release.apk آماده نصب روی هر گوشی اندرویدی با اندروید ۸ به بالا است.`;
