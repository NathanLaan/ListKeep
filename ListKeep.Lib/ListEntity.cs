using System;
using System.Web;
using System.Data;
using System.Data.SQLite;

namespace ListKeep.Lib
{
    public class ListEntity
    {

        public int ID { get; set; }
        public string ListID { get; set; }
        public string ListName { get; set; }

        public ListEntity(string name)
        {
        }

    }
}