package com.example.administrador.appvehiculo;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

import cz.msebera.android.httpclient.Header;

public class MainActivity extends AppCompatActivity {
    ListView listado;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        listado = (ListView) findViewById(R.id.listado);
        obtDato();
    }

    private void obtDato() {
        AsyncHttpClient client = new AsyncHttpClient();
        String URL = "http://192.168.0.103/ListadoApp/backend/index.php/controller_vehiculo/listar";

        RequestParams parametro = new RequestParams();

        client.post(URL, parametro, new AsyncHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                if (statusCode==200){
                    //llamado de funcion
                    Cargar(obtDatosJSON(new String(responseBody)));
                }
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {

            }
        });
    }

    public void Cargar(ArrayList<String> datos){
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,datos);
        listado.setAdapter(adapter);
    }


    public ArrayList<String> obtDatosJSON(String response){
        ArrayList<String> listado = new ArrayList<>();

        try {
            JSONArray jsonArray = new JSONArray(response);
            String TEXTO="";
            String obj =jsonArray.getJSONObject(0).getString("data");
            JSONArray json = new JSONArray(obj);
            for (int i=0; i<json.length();i++){
                 TEXTO = json.getJSONObject(i).getString("marca");
                 listado.add(TEXTO);
            }

        }catch (Exception e){

        }
        return listado;
    }

}
