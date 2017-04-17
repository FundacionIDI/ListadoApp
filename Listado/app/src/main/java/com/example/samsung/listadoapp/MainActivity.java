package com.example.samsung.listadoapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;

import java.util.ArrayList;

import cz.msebera.android.httpclient.Header;


public class MainActivity extends AppCompatActivity {

    ListView listado;
    Button siguiente;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        listado = (ListView)findViewById(R.id.lista);
        ObtDatos();

        siguiente = (Button)findViewById(R.id.crear);
        siguiente.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this,Crear.class);
                startActivity(intent);
            }

        });
    }

    public void ObtDatos(){
        AsyncHttpClient client = new AsyncHttpClient();
        String url="http://192.168.1.11:8080/backend/crud_android/listar";
        RequestParams parametros = new RequestParams();

        client.post(url, parametros, new AsyncHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
              if (statusCode ==200){
                  CargaLista(ObtDatosJSON(new String(responseBody)));
              }
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {

            }
        });
 }


   public  void CargaLista(ArrayList<String> datos){
       ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,datos);
       listado.setAdapter(adapter);

   }


    public ArrayList<String> ObtDatosJSON(String response){
     ArrayList<String> listado = new ArrayList<String>();
        try {
            JSONArray jsonArray = new JSONArray(response);
            String texto;
            for(int i=0 ; i<jsonArray.length();i++){
             texto = jsonArray.getJSONObject(i).getString("modelo")+"-"+
                     jsonArray.getJSONObject(i).getString("marca")+"-"+
                     jsonArray.getJSONObject(i).getString("color")+"-"+
                     jsonArray.getJSONObject(i).getString("placa")+"-"+
                     jsonArray.getJSONObject(i).getString("precio")+"-"+
                     jsonArray.getJSONObject(i).getString("ano")+"-"+
                     jsonArray.getJSONObject(i).getString("tipo")+"";
                listado.add(texto);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return listado;
    }
}

