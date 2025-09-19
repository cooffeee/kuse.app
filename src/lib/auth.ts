import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { query } from '@/lib/database/connection';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // ユーザーが存在するかチェック
          const existingUser = await query(
            'SELECT id FROM users WHERE email = $1',
            [user.email]
          );

          // 新規ユーザーの場合はデータベースに追加
          if (existingUser.rows.length === 0) {
            await query(
              'INSERT INTO users (email, name, avatar_url) VALUES ($1, $2, $3)',
              [user.email, user.name, user.image]
            );
          }
          return true;
        } catch (error) {
          console.error('サインインエラー:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        try {
          const user = await query(
            'SELECT id, name, avatar_url FROM users WHERE email = $1',
            [session.user.email]
          );
          
          if (user.rows.length > 0) {
            session.user.id = user.rows[0].id;
            session.user.name = user.rows[0].name;
            session.user.image = user.rows[0].avatar_url;
          }
        } catch (error) {
          console.error('セッション取得エラー:', error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
