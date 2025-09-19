import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database/connection';

// 癖の一覧取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'ユーザーIDが必要です' }, { status: 400 });
    }

    const result = await query(
      'SELECT * FROM habits WHERE user_id = $1 AND is_active = true ORDER BY created_at DESC',
      [userId]
    );

    return NextResponse.json({ habits: result.rows });
  } catch (error) {
    console.error('癖の取得エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}

// 新しい癖の作成
export async function POST(request: NextRequest) {
  try {
    const { userId, name, color, dailyGoal } = await request.json();
    
    if (!userId || !name) {
      return NextResponse.json({ error: 'ユーザーIDと癖の名前が必要です' }, { status: 400 });
    }

    const result = await query(
      'INSERT INTO habits (user_id, name, color, daily_goal) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, name, color || '#8B5CF6', dailyGoal || 0]
    );

    return NextResponse.json({ habit: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('癖の作成エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
