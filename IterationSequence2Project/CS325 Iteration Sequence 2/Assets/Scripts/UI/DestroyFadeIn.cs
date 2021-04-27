using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DestroyFadeIn : MonoBehaviour
{
    public void Destroy()
    {
        Destroy(this.gameObject);
    }
}
