import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database/connection';

// カウント履歴の取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const result = await query(
      `SELECT count_date, count_value 
       FROM habit_counts 
       WHERE habit_id = $1 AND count_date >= $2 
       ORDER BY count_date DESC`,
      [params.id, startDate.toISOString().split('T')[0]]
    );

    return NextResponse.json({ counts: result.rows });
  } catch (error) {
    console.error('カウント履歴の取得エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}

// カウントの記録・更新
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { countDate, countValue } = await request.json();
    
    if (!countDate || countValue === undefined) {
      return NextResponse.json({ error: '日付とカウント値が必要です' }, { status: 400 });
    }

    // UPSERT（存在すれば更新、存在しなければ挿入）
    const result = await query(
      `INSERT INTO habit_counts (habit_id, count_date, count_value) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (habit_id, count_date) 
       DO UPDATE SET count_value = $3, updated_at = NOW() 
       RETURNING *`,
      [params.id, countDate, countValue]
    );

    return NextResponse.json({ count: result.rows[0] });
  } catch (error) {
    console.error('カウントの記録エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
