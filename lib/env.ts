/**
 * 環境変数の検証とセキュリティチェック
 * アプリケーション起動時に実行され、必要な環境変数が揃っているか確認
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const

export function validateEnv() {
  const missing: string[] = []
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar)
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `❌ 必須の環境変数が設定されていません:\n${missing.join('\n')}\n\n` +
      `.env.localファイルを作成し、必要な値を設定してください。`
    )
  }

  // URLの形式チェック
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  if (!supabaseUrl.startsWith('https://')) {
    console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL は https:// で始まるべきです')
  }

  // ANON KEYの基本チェック（JWT形式）
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  if (!anonKey.includes('.')) {
    throw new Error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY の形式が正しくありません')
  }

  console.log('✅ 環境変数の検証が完了しました')
}

// 型安全な環境変数アクセス
export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
} as const
