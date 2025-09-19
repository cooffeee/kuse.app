import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database/connection';

// 特定の癖の取得・更新・削除
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await query(
      'SELECT * FROM habits WHERE id = $1',
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: '癖が見つかりません' }, { status: 404 });
    }

    return NextResponse.json({ habit: result.rows[0] });
  } catch (error) {
    console.error('癖の取得エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}

// 癖の更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, color, dailyGoal } = await request.json();
    
    const result = await query(
      'UPDATE habits SET name = $1, color = $2, daily_goal = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [name, color, dailyGoal, params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: '癖が見つかりません' }, { status: 404 });
    }

    return NextResponse.json({ habit: result.rows[0] });
  } catch (error) {
    console.error('癖の更新エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}

// 癖の削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await query(
      'UPDATE habits SET is_active = false WHERE id = $1 RETURNING *',
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: '癖が見つかりません' }, { status: 404 });
    }

    return NextResponse.json({ message: '癖が削除されました' });
  } catch (error) {
    console.error('癖の削除エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
