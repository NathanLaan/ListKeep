using System;
using System.Data.SQLite;

namespace ListKeep.Lib
{
    public class EntityBase
    {

        public static string DatabaseFilePath { get; set; }

        protected string CreateRandom(int size)
        {
            var validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            char[] charList = new char[size];
            Random random = new Random();
            for (int i = 0; i < charList.Length; i++)
            {
                charList[i] = validChars[random.Next(validChars.Length)];
            }
            return new String(charList);
        }


        public SQLiteConnection Connection { get; set; }

        public EntityBase()
        {
            this.Connection = new SQLiteConnection("Data Source=" + EntityBase.DatabaseFilePath);
        }

    }
}
