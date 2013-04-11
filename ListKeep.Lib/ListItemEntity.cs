using System;
using System.Data.SQLite;

namespace ListKeep.Lib
{
    public class ListItemEntity : EntityBase
    {

        public int ID { get; set; }
        public string ListID { get; set; }
        public string ListItemID { get; set; }
        public string ListItemName { get; set; }


        public ListItemEntity(string listID, string listItemName)
        {
            this.ListID = listID;
            this.ListItemName = listItemName;
            this.ListItemID = base.CreateRandom(16);
        }

        public int Insert()
        {
            try
            {
                this.Connection.Open();

                //
                // TODO: Check for existing item?
                //

                SQLiteCommand command = new SQLiteCommand("INSERT INTO ListItem (ListID, ListItemID, ListItemName) VALUES (@listID, @listItemID, @listItemName); SELECT last_insert_rowid();", this.Connection);
                command.Parameters.AddWithValue("@listID", this.ListID);
                command.Parameters.AddWithValue("@listItemID", this.ListItemID);
                command.Parameters.AddWithValue("@listItemName", this.ListItemName);
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
