using System;
using System.Data.SQLite;

namespace ListKeep.Lib
{
    public class ListEntity : EntityBase
    {

        public int ID { get; set; }
        public string ListID { get; set; }
        public string ListName { get; set; }


        public ListEntity(string name)
        {
            this.ListName = name;
            this.ListID = base.CreateRandom(8);
        }

        public int Insert()
        {
            try
            {
                this.Connection.Open();

                //
                // TODO: Check for existing ListID
                //

                SQLiteCommand command = new SQLiteCommand("INSERT INTO List (ListID, ListName) VALUES (@ListID, @ListName); SELECT last_insert_rowid();", this.Connection);
                command.Parameters.AddWithValue("@ListID", this.ListID);
                command.Parameters.AddWithValue("@ListName", this.ListName);
                Object result = command.ExecuteScalar();
                this.ID = int.Parse(result.ToString());
            }
            catch (Exception exception)
            {
            }
            finally
            {
                this.Connection.Close();
            }
            return this.ID;
        }

        public void Select()
        {
            try
            {
                this.Connection.Open();

                //
                // TODO: Check for existing ListID
                //

                SQLiteCommand command = new SQLiteCommand("SELECT List.ID,List.ListName FROM List WHERE ListID=@ListID;", this.Connection);
                command.Parameters.AddWithValue("@ListID", this.ListID);
                SQLiteDataReader dataReader = command.ExecuteReader();

                dataReader.Read();
                if (dataReader.FieldCount > 0)
                {
                    this.ID = dataReader.GetInt32(0);
                    this.ListName = dataReader.GetString(1);
                }
                dataReader.Close();
                dataReader.Dispose();
            }
            catch (Exception exception)
            {
            }
            finally
            {
                this.Connection.Close();
            }
        }

    }
}
