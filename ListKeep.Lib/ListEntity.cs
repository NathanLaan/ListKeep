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

                SQLiteCommand command = new SQLiteCommand("INSERT INTO List (ListID, ListName) VALUES (@listID, @listName); SELECT last_insert_rowid();", this.Connection);
                command.Parameters.AddWithValue("@ListID", this.ListID);
                command.Parameters.AddWithValue("@ListName", this.ListName);
                Object result = command.ExecuteScalar();
                try
                {
                    this.ID = int.Parse(result.ToString());
                }
                catch (Exception castException)
                {
                    this.ID = 0;
                }
            }
            catch (SQLiteException sqLiteException)
            {
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

    }
}
