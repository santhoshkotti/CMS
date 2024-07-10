from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.json.sort_keys = False

filePath = './data/data.json'

if os.path.exists(filePath):
    if os.path.getsize(filePath) > 0:
        with open(filePath, 'r') as f:
            data = json.load(f)
            responseData = data.get('responseData', [])
            responseUser = data.get('responseUser', [])
            responseOptions=data.get('responseOptions',[])
            responseRoleCategoryPermissions=data.get('responseRoleCategoryPermissions',[])
            responseCategoryAdditionalFields=data.get('responseCategoryAdditionalFields',[])
            responseTypes=data.get('responseTypes',[])
            responseUserRoles=data.get('responseUserRoles',[])
            responseContracts=data.get('responseContracts',[])
            responseContractAdditionalFieldValues=data.get('responseContractAdditionalFieldValues',[])
    else:
        responseData = []  
        responseUser = []  
        responseOptions=[]
        responseRoleCategoryPermissions=[]
        responseCategoryAdditionalFields=[]
        responseTypes=[]
        responseContracts=[]
        responseContractAdditionalFieldValues=[]
        responseUserRoles=[]
        with open(filePath, 'w') as f:
            json.dump({'responseData': responseData, 'responseUser': responseUser, 'responseOptions': responseOptions,'responseUserRoles':responseUserRoles,'responseRoleCategoryPermissions':responseRoleCategoryPermissions,'responseCategoryAdditionalFields':responseCategoryAdditionalFields,'responseTypes':responseTypes,'responseContracts':responseContracts,'responseContractAdditionalFieldValues':responseContractAdditionalFieldValues}, f)


def save_data():
    with open(filePath, 'w') as f:
        json.dump({'responseData': responseData, 'responseUser': responseUser, 'responseUserRoles':responseUserRoles,'responseOptions': responseOptions,'responseRoleCategoryPermissions':responseRoleCategoryPermissions,'responseCategoryAdditionalFields':responseCategoryAdditionalFields,'responseTypes':responseTypes,'responseContracts':responseContracts,'responseContractAdditionalFieldValues':responseContractAdditionalFieldValues}, f)


# CRUD Endpoints for Users

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = {
        "Id": max([user["Id"] for user in responseUser] or [0]) + 1,
        "FirstName": data['FirstName'],
        "LastName": data['LastName'],
        "Email": data['Email'],
        "HashPassword": data['HashPassword'],
        "Token": data.get('Token'),
        "RefreshToken": data.get('RefreshToken'),
        "ExpiryTime": data.get('ExpiryTime'),
        "IsDisabled": data.get('IsDisabled', False),
        "CreatedByUserId": data.get('CreatedByUserId'),
        "CreatedAt": datetime.utcnow().isoformat(),
        "UpdatedByUserId": data.get('UpdatedByUserId'),
        "UpdatedAt": datetime.utcnow().isoformat()
    }
    responseUser.append(new_user)
    save_data()
    return jsonify(new_user), 201

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(responseUser), 200

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((user for user in responseUser if user["Id"] == user_id), None)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user), 200

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = next((user for user in responseUser if user["Id"] == user_id), None)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    user.update({
        "FirstName": data.get('FirstName', user['FirstName']),
        "LastName": data.get('LastName', user['LastName']),
        "Email": data.get('Email', user['Email']),
        "HashPassword": data.get('HashPassword', user['HashPassword']),
        "Token": data.get('Token', user['Token']),
        "RefreshToken": data.get('RefreshToken', user['RefreshToken']),
        "ExpiryTime": data.get('ExpiryTime', user['ExpiryTime']),
        "IsDisabled": data.get('IsDisabled', user['IsDisabled']),
        "CreatedByUserId": data.get('CreatedByUserId', user['CreatedByUserId']),
        "UpdatedByUserId": data.get('UpdatedByUserId', user['UpdatedByUserId']),
        "UpdatedAt": datetime.utcnow().isoformat()
    })
    save_data()
    return jsonify(user), 200

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global responseUser
    responseUser = [user for user in responseUser if user["Id"] != user_id]
    save_data()
    return jsonify({"message": "User deleted successfully"}), 200

# CRUD Endpoints for Options

@app.route('/options', methods=['POST'])
def create_option():
    data = request.get_json()
    new_option = {
        "Id": len(responseOptions) + 1,
        "Key": data['Key'],
        "Value": data.get('Value', ''),
        "IsDisabled": data.get('IsDisabled', False),
        "CreatedBy": data.get('CreatedBy'),
        "CreatedAt": datetime.utcnow().isoformat(),
        "UpdatedBy": data.get('UpdatedBy'),
        "UpdatedAt": datetime.utcnow().isoformat()
    }
    responseOptions.append(new_option)
    save_data()
    return jsonify(new_option), 201

@app.route('/options', methods=['GET'])
def get_options():
    return jsonify(responseOptions), 200

@app.route('/options/<int:option_id>', methods=['GET'])
def get_option(option_id):
    option = next((opt for opt in responseOptions if opt["Id"] == option_id), None)
    if option is None:
        return jsonify({"message": "Option not found"}), 404
    return jsonify(option), 200

@app.route('/options/<int:option_id>', methods=['PUT'])
def update_option(option_id):
    data = request.get_json()
    option = next((opt for opt in responseOptions if opt["Id"] == option_id), None)
    if option is None:
        return jsonify({"message": "Option not found"}), 404
    
    option.update({
        "Key": data.get('Key', option['Key']),
        "Value": data.get('Value', option['Value']),
        "IsDisabled": data.get('IsDisabled', option['IsDisabled']),
        "UpdatedBy": data.get('UpdatedBy', option['UpdatedBy']),
        "UpdatedAt": datetime.utcnow().isoformat()
    })
    save_data()
    return jsonify(option), 200

@app.route('/options/<int:option_id>', methods=['DELETE'])
def delete_option(option_id):
    global responseOptions
    responseOptions = [opt for opt in responseOptions if opt["Id"] != option_id]
    save_data()
    return jsonify({"message": "Option deleted successfully"}), 200

# CRUD Endpoints for Role-Category-Permissions

@app.route('/rolecategorypermissions', methods=['GET'])
def get_role_category_permissions():
    return jsonify(responseRoleCategoryPermissions), 200

@app.route('/rolecategorypermissionswithnames',methods=['Get'])
def get_role_cat_names():
    category_map = {item['Id']: item['Value'] for item in data['responseOptions'] if item['Key'] == 'Category'}
    role_map = {item['Id']: item['Value'] for item in data['responseOptions'] if item['Key'] == 'Role'}
    permission_map = {item['Id']: item['Value'] for item in data['responseOptions'] if item['Key'] == 'Permissions'}
    response_list = []
    for item in data['responseRoleCategoryPermissions']:
        category_name = category_map.get(item['CategoryId'])
        role_name = role_map.get(item['RoleId'])
        permission_name = permission_map.get(item['PermissionId'])
        response_list.append({
            'Category': category_name,
            'Role': role_name,
            'Permission': permission_name
        })
    return jsonify(response_list)


@app.route('/rolecategorypermissions', methods=['POST'])
def add_role_category_permission():
    new_permission = request.get_json()
    responseRoleCategoryPermissions.append(new_permission)
    save_data()
    return jsonify(new_permission), 201

@app.route('/rolecategorypermissions', methods=['PUT'])
def update_role_category_permission():
    data = request.get_json()
    permission = next((perm for perm in responseRoleCategoryPermissions if perm['RoleId'] == data['RoleId'] and perm['CategoryId'] == data['CategoryId'] and perm['PermissionId'] == data['PermissionId']), None)
    if not permission:
        return jsonify({'error': 'Permission not found'}), 404
    permission.update(data)
    permission['UpdatedAt'] = datetime.now().isoformat()
    save_data()
    return jsonify(permission), 200

@app.route('/rolecategorypermissions', methods=['DELETE'])
def delete_role_category_permission():
    data = request.get_json()
    global responseRoleCategoryPermissions
    responseRoleCategoryPermissions = [perm for perm in responseRoleCategoryPermissions if not (perm['RoleId'] == data['RoleId'] and perm['CategoryId'] == data['CategoryId'] and perm['PermissionId'] == data['PermissionId'])]
    save_data()
    return '', 204

# CRUD operations for CategoryAdditionalFields

# @app.route('/categoryadditionalfields', methods=['POST'])
# def create_category_additional_field():
#     data = request.get_json()
#     new_field = {
#         "CategoryId": data['CategoryId'],
#         "AdditionalFieldId": data['AdditionalFieldId'],
#         "CreatedAt": datetime.utcnow().isoformat(),
#         "CreatedBy": data.get('CreatedBy'),
#         "UpdatedAt": datetime.utcnow().isoformat(),
#         "UpdatedBy": data.get('UpdatedBy')
#     }
#     responseCategoryAdditionalFields.append(new_field)
#     save_data()
#     return jsonify(new_field), 201

@app.route('/categoryadditionalfields', methods=['POST'])
def create_category_additional_fields():
    data = request.get_json()
    
    new_fields = []
    for item in data:
        new_field = {
            "CategoryId": item['CategoryId'],
            "AdditionalFieldId": item['AdditionalFieldId'],
            "CreatedAt": datetime.utcnow().isoformat(),
            "CreatedBy": item.get('CreatedBy'),
            "UpdatedAt": datetime.utcnow().isoformat(),
            "UpdatedBy": item.get('UpdatedBy')
        }
        responseCategoryAdditionalFields.append(new_field)
        new_fields.append(new_field)
    
    save_data()
    return jsonify(new_fields), 201

@app.route('/categoryadditionalfields', methods=['GET'])
def get_category_additional_fields():
    return jsonify(responseCategoryAdditionalFields), 200


@app.route('/responsecategoryadditionalfields', methods=['GET'])
def get_response_category_additional_fields():
    additional_field_map = {item['Id']: item['Value'] for item in data['responseOptions'] if item['Key'] == 'AdditionalField'}
    result = []

    for entry in data['responseCategoryAdditionalFields']:
        category_id = entry['CategoryId']
        additional_field_id = entry['AdditionalFieldId']
        
        category_name = next((item['Value'] for item in data['responseOptions'] if item['Id'] == category_id and item['Key'] == 'Category'), None)
        additional_field_name = additional_field_map.get(additional_field_id)
        
        if category_name and additional_field_name:
            result.append({
                "Category": category_name,
                "AdditionalField": additional_field_name
            })

    return jsonify(result)


@app.route('/categoryadditionalfields/<int:category_id>/<int:additional_field_id>', methods=['GET'])
def get_category_additional_field(category_id, additional_field_id):
    field = next((field for field in responseCategoryAdditionalFields if field["CategoryId"] == category_id and field["AdditionalFieldId"] == additional_field_id), None)
    if field is None:
        return jsonify({"message": "Category Additional Field not found"}), 404
    return jsonify(field), 200


@app.route('/categoryadditionalfields/<int:category_id>/<int:additional_field_id>', methods=['PUT'])
def update_category_additional_field(category_id, additional_field_id):
    data = request.get_json()
    field = next((field for field in responseCategoryAdditionalFields if field["CategoryId"] == category_id and field["AdditionalFieldId"] == additional_field_id), None)
    if field is None:
        return jsonify({"message": "Category Additional Field not found"}), 404

    field.update({
        "CreatedBy": data.get('CreatedBy', field['CreatedBy']),
        "UpdatedBy": data.get('UpdatedBy', field['UpdatedBy']),
        "UpdatedAt": datetime.utcnow().isoformat()
    })
    save_data()
    return jsonify(field), 200


@app.route('/categoryadditionalfields/<int:category_id>/<int:additional_field_id>', methods=['DELETE'])
def delete_category_additional_field(category_id, additional_field_id):
    global responseCategoryAdditionalFields
    responseCategoryAdditionalFields = [field for field in responseCategoryAdditionalFields if not (field["CategoryId"] == category_id and field["AdditionalFieldId"] == additional_field_id)]
    save_data()
    return jsonify({"message": "Category Additional Field deleted successfully"}), 200


# CRUD operations for Types

@app.route('/types', methods=['GET'])
def get_types():
    return jsonify(responseTypes), 200


@app.route('/types', methods=['POST'])
def create_type():
    new_type = request.get_json()
    new_type['Id'] = max([t['Id'] for t in responseTypes] or [0]) + 1
    new_type['CreatedAt'] = datetime.now().isoformat()
    new_type['UpdatedAt'] = datetime.now().isoformat()
    responseTypes.append(new_type)
    save_data()
    return jsonify(new_type), 201


@app.route('/types/<int:type_id>', methods=['PUT'])
def update_type(type_id):
    type_data = request.get_json()
    for type_item in responseTypes:
        if type_item['Id'] == type_id:
            type_item.update(type_data)
            type_item['UpdatedAt'] = datetime.now().isoformat()
            save_data()
            return jsonify(type_item), 200
    return jsonify({"message": "Type not found"}), 404


@app.route('/types/<int:type_id>', methods=['DELETE'])
def delete_type(type_id):
    global responseTypes
    responseTypes = [t for t in responseTypes if t['Id'] != type_id]
    save_data()
    return '', 204

# CRUD operations for UserRoles

@app.route('/userroles', methods=['GET'])
def get_user_roles():
    return jsonify(responseUserRoles), 200


@app.route('/userroles', methods=['POST'])
def create_user_role():
    new_user_role = request.get_json()
    responseUserRoles.append(new_user_role)
    save_data()
    return jsonify(new_user_role), 201


@app.route('/userroles/<int:user_id>/<int:role_id>', methods=['PUT'])
def update_user_role(user_id, role_id):
    data = request.get_json()
    for user_role in responseUserRoles:
        if user_role['UserId'] == user_id and user_role['RoleId'] == role_id:
            user_role.update(data)
            user_role['UpdatedAt'] = datetime.utcnow().isoformat()
            save_data()
            return jsonify(user_role), 200
    return jsonify({"message": "User role not found"}), 404


@app.route('/userroles/<int:user_id>/<int:role_id>', methods=['DELETE'])
def delete_user_role(user_id, role_id):
    global responseUserRoles
    responseUserRoles = [ur for ur in responseUserRoles if ur['UserId'] != user_id or ur['RoleId'] != role_id]
    save_data()
    return '', 204

# CRUD operations for Contracts
@app.route('/contracts', methods=['GET'])
def get_contracts():
    return jsonify(responseContracts), 200


@app.route('/contracts', methods=['POST'])
def create_contract():
    new_contract = request.get_json()
    new_contract['Id'] = len(responseContracts) + 1  # Assigning a new ID
    new_contract['CreatedAt'] = datetime.utcnow().isoformat()
    new_contract['UpdatedAt'] = datetime.utcnow().isoformat()
    responseContracts.append(new_contract)
    save_data()
    return jsonify(new_contract), 201


@app.route('/contracts/<int:contract_id>', methods=['GET'])
def get_contract(contract_id):
    contract = next((c for c in responseContracts if c['Id'] == contract_id), None)
    if contract is None:
        return jsonify({"message": "Contract not found"}), 404
    return jsonify(contract), 200


@app.route('/contracts/<int:contract_id>', methods=['PUT'])
def update_contract(contract_id):
    data = request.get_json()
    for contract in responseContracts:
        if contract['Id'] == contract_id:
            contract.update(data)
            contract['UpdatedAt'] = datetime.utcnow().isoformat()
            save_data()
            return jsonify(contract), 200
    return jsonify({"message": "Contract not found"}), 404


@app.route('/contracts/<int:contract_id>', methods=['DELETE'])
def delete_contract(contract_id):
    global responseContracts
    responseContracts = [c for c in responseContracts if c['Id'] != contract_id]
    save_data()
    return '', 204

# CRUD for Contract Additionl Fields

@app.route('/contract-additional-fields-values', methods=['GET'])
def get_contract_additional_fields_values():
    return jsonify(responseContractAdditionalFieldValues), 200

# @app.route('/contract-additional-fields-values', methods=['POST'])
# def create_contract_additional_fields_value():
#     new_value = request.get_json()
#     new_value['CreatedAt'] = datetime.utcnow().isoformat()
#     new_value['UpdatedAt'] = datetime.utcnow().isoformat()
#     responseContractAdditionalFieldValues.append(new_value)
#     save_data()
#     return jsonify(new_value), 201

@app.route('/contract-additional-fields-values', methods=['POST'])
def create_contract_additional_fields_values():
    new_values = request.get_json()
    print(new_values)
    timestamp = datetime.utcnow().isoformat()
    for new_value in new_values:
        new_value['CreatedAt'] = timestamp
        new_value['UpdatedAt'] = timestamp
        responseContractAdditionalFieldValues.append(new_value)
    save_data()
    return jsonify(new_values), 201

@app.route('/contract-additional-fields-values/<int:contract_id>/<int:additional_field_id>', methods=['GET'])
def get_contract_additional_fields_value(contract_id, additional_field_id):
    value = next((v for v in responseContractAdditionalFieldValues if v['ContractId'] == contract_id and v['AdditionalFieldId'] == additional_field_id), None)
    if value is None:
        return jsonify({"message": "ContractAdditionalFieldsValue not found"}), 404
    return jsonify(value), 200

@app.route('/contract-additional-fields-values/<int:contract_id>/<int:additional_field_id>', methods=['PUT'])
def update_contract_additional_fields_value(contract_id, additional_field_id):
    data = request.get_json()
    for value in responseContractAdditionalFieldValues:
        if value['ContractId'] == contract_id and value['AdditionalFieldId'] == additional_field_id:
            value.update(data)
            value['UpdatedAt'] = datetime.utcnow().isoformat()
            save_data()
            return jsonify(value), 200
    return jsonify({"message": "ContractAdditionalFieldsValue not found"}), 404

@app.route('/contract-additional-fields-values/<int:contract_id>/<int:additional_field_id>', methods=['DELETE'])
def delete_contract_additional_fields_value(contract_id, additional_field_id):
    global responseContractAdditionalFieldValues
    responseContractAdditionalFieldValues = [v for v in responseContractAdditionalFieldValues if not (v['ContractId'] == contract_id and v['AdditionalFieldId'] == additional_field_id)]
    save_data()
    return '', 204

#ADDITIONAL APIS

@app.route('/categoryadditionalfeildnames/<int:category_id>',methods=['get'])
def additonal_cate_values(category_id):
    global responseCategoryAdditionalFields
    global responseOptions
    response=[ v for v in responseCategoryAdditionalFields if(v['CategoryId']==category_id)]   
    additional_field_ids = [item['AdditionalFieldId'] for item in response]
    values = [
        {'AdditionalFieldId': option['Id'], 'Value': option['Value']}
        for option in responseOptions
        if option['Id'] in additional_field_ids
    ]
    return jsonify(values), 200

@app.route('/contract-additional-fields-values/<int:contract_id>', methods=['GET'])
def get_contract_additional_fields_valuesk(contract_id):
    additional_field_ids = [v['AdditionalFieldId'] for v in responseContractAdditionalFieldValues if v['ContractId'] == contract_id]
    
    if not additional_field_ids:
        return jsonify({"message": "No AdditionalFieldIds found for the given ContractId"}), 404
    existing_json = [{"AdditionalFieldId": field_id, "Value": next((opt['Value'] for opt in responseOptions if opt['Id'] == field_id), "Value not found")} for field_id in additional_field_ids]
    values = [
        {"AdditionalFieldId": item['AdditionalFieldId'], "C_Value": item['Value']}
        for item in responseContractAdditionalFieldValues if item['ContractId'] == contract_id
    ]
    merged_values = []

    for existing_item in existing_json:
        for new_item in values:
            if existing_item['AdditionalFieldId'] == new_item['AdditionalFieldId']:
                merged_values.append({**existing_item, **new_item})

    print(merged_values)  
    return jsonify(merged_values), 200
    
   
    
  


if __name__ == '__main__':
    app.run(debug=True)
