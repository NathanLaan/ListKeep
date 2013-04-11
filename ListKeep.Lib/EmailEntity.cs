using System;
using System.Data.SQLite;

namespace ListKeep.Lib
{
    public class EmailEntity : EntityBase
    {

        public int ID { get; set; }
        public int ListID { get; set; }
        public string Email { get; set; }


        public EmailEntity(int listID, string email)
        {
            this.Email = email;
            this.ListID = listID;
        }


        public void Insert()
        {
            try
            {
                this.Connection.Open();

                //
                // TODO: Check for existing record
                //

                SQLiteCommand command = new SQLiteCommand("INSERT INTO ListOwner (ListID, Email) VALUES (@listID, @email);", this.Connection);
                command.Parameters.AddWithValue("@listID", this.ListID);
                command.Parameters.AddWithValue("@email", this.Email);
                command.ExecuteNonQuery();
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